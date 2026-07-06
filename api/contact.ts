export const config = { runtime: "edge" };

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  console.log("MAKE_WEBHOOK_URL present:", Boolean(webhookUrl));
  if (!webhookUrl) {
    return new Response("Server misconfigured: MAKE_WEBHOOK_URL not set", { status: 500 });
  }

  try {
    const body = await request.text();
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
