export const config = { runtime: "edge" };

declare const process: { env: Record<string, string | undefined> };

const MAX_BODY_BYTES = 10_000;

// Per-field caps, matching the form's maxLength limits.
const LIMITS = { name: 100, email: 254, phone: 20, message: 2000, establishmentType: 50 };

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  establishmentType?: unknown;
  website?: unknown; // honeypot: hidden from people, filled by bots
};

type CleanPayload = { name: string; email: string; phone: string; message: string; establishmentType: string };

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function validate(data: ContactPayload): { error: string } | { clean: CleanPayload } {
  const clean = {
    name: str(data.name),
    email: str(data.email),
    phone: str(data.phone),
    message: str(data.message),
    establishmentType: str(data.establishmentType),
  };
  for (const [key, max] of Object.entries(LIMITS)) {
    if (clean[key as keyof CleanPayload].length > max) return { error: `${key} is too long` };
  }
  if (!clean.name) return { error: "Name is required" };
  if (!/^[A-Za-zÀ-ſ .'-]+$/.test(clean.name)) return { error: "Name can only contain letters" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) return { error: "Valid email required" };
  if (clean.phone && !/^0\d{9,10}$/.test(clean.phone.replace(/[\s-]/g, ""))) return { error: "Valid PH mobile number required" };
  if (clean.message.length < 10) return { error: "Message must be at least 10 characters" };
  if (!clean.establishmentType) return { error: "Establishment type is required" };
  return { clean };
}

// Only accept browser requests sent from this same site (production, previews, or a custom domain).
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Requiring JSON forces cross-site browsers into a CORS preflight, which this endpoint never approves.
  if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
    return new Response("Unsupported Media Type", { status: 415 });
  }

  if (!isSameOrigin(request)) {
    return new Response("Forbidden", { status: 403 });
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    return new Response("Server misconfigured", { status: 500 });
  }

  const body = await request.text();
  if (new TextEncoder().encode(body).length > MAX_BODY_BYTES) {
    return new Response("Payload too large", { status: 413 });
  }

  let data: ContactPayload;
  try {
    data = JSON.parse(body);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }
  if (!data || typeof data !== "object") {
    return new Response("Invalid JSON", { status: 400 });
  }

  // Bot filled the hidden field: pretend success, forward nothing.
  if (str(data.website)) {
    return new Response(null, { status: 200 });
  }

  const result = validate(data);
  if ("error" in result) {
    return new Response(result.error, { status: 400 });
  }

  try {
    // Forward only the known, trimmed fields — never the raw request body.
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.clean),
    });
    return new Response(null, { status: res.ok ? 200 : 502 });
  } catch (err) {
    console.error("Webhook forward failed:", err);
    return new Response("Upstream request failed", { status: 502 });
  }
}
