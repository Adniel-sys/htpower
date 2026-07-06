export const config = { runtime: "edge" };

const MAX_BODY_BYTES = 10_000;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  establishmentType?: unknown;
};

function validate(data: ContactPayload): string | null {
  if (typeof data.name !== "string" || !data.name.trim()) return "Name is required";
  if (typeof data.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Valid email required";
  if (typeof data.phone === "string" && data.phone.trim() && !/^0\d{9,10}$/.test(data.phone.replace(/[\s-]/g, ""))) {
    return "Valid PH mobile number required";
  }
  if (typeof data.message !== "string" || data.message.trim().length < 10) return "Message must be at least 10 characters";
  if (typeof data.establishmentType !== "string" || !data.establishmentType) return "Establishment type is required";
  return null;
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    return new Response("Server misconfigured", { status: 500 });
  }

  const body = await request.text();
  if (body.length > MAX_BODY_BYTES) {
    return new Response("Payload too large", { status: 413 });
  }

  let data: ContactPayload;
  try {
    data = JSON.parse(body);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const validationError = validate(data);
  if (validationError) {
    return new Response(validationError, { status: 400 });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    return new Response(null, { status: res.ok ? 200 : 502 });
  } catch (err) {
    console.error("Webhook forward failed:", err);
    return new Response("Upstream request failed", { status: 502 });
  }
}
