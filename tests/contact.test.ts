import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler from "../api/contact";

const ORIGIN = "https://htpower.test";
const WEBHOOK = "https://hook.example/test";
const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const validBody = {
  name: "Juan Dela Cruz",
  email: "juan@example.com",
  phone: "0917-123-4567",
  message: "We have termites in the warehouse.",
  establishmentType: "Industrial & Warehouses",
  website: "",
  turnstileToken: "test-token",
};

function post(body: unknown, headers: Record<string, string> = {}) {
  return new Request(`${ORIGIN}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: ORIGIN, ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

// Stub fetch: Cloudflare siteverify answers with `turnstileOk`, the Make webhook with `webhookStatus`.
function mockFetch({ turnstileOk = true, webhookStatus = 200 } = {}) {
  const fetchMock = vi.fn(async (url: string | URL | Request, _init?: RequestInit) => {
    if (String(url) === SITEVERIFY) return Response.json({ success: turnstileOk });
    return new Response(null, { status: webhookStatus });
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

const webhookCalls = (fetchMock: ReturnType<typeof mockFetch>) =>
  fetchMock.mock.calls.filter(([url]) => String(url) === WEBHOOK);

beforeEach(() => {
  vi.stubEnv("MAKE_WEBHOOK_URL", WEBHOOK);
  vi.stubEnv("TURNSTILE_SECRET_KEY", "1x0000000000000000000000000000000AA");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("POST /api/contact", () => {
  it("forwards only the five clean fields to Make on success", async () => {
    const fetchMock = mockFetch();
    const res = await handler(post(validBody));

    expect(res.status).toBe(200);
    const calls = webhookCalls(fetchMock);
    expect(calls).toHaveLength(1);
    const sent = JSON.parse(String(calls[0][1]?.body));
    expect(sent).toEqual({
      name: "Juan Dela Cruz",
      email: "juan@example.com",
      phone: "0917-123-4567",
      message: "We have termites in the warehouse.",
      establishmentType: "Industrial & Warehouses",
    });
  });

  it("rejects non-POST methods with 405", async () => {
    const res = await handler(new Request(`${ORIGIN}/api/contact`));
    expect(res.status).toBe(405);
  });

  it("rejects non-JSON bodies with 415", async () => {
    const res = await handler(post("name=x", { "content-type": "text/plain" }));
    expect(res.status).toBe(415);
  });

  it("rejects requests from another origin with 403", async () => {
    const res = await handler(post(validBody, { origin: "https://evil.example" }));
    expect(res.status).toBe(403);
  });

  it("returns 500 when the Turnstile secret is not configured", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    const res = await handler(post(validBody));
    expect(res.status).toBe(500);
  });

  it("rejects bodies over 10 KB with 413", async () => {
    const res = await handler(post({ ...validBody, message: "x".repeat(11_000) }));
    expect(res.status).toBe(413);
  });

  it("rejects malformed JSON with 400", async () => {
    const res = await handler(post("{not json"));
    expect(res.status).toBe(400);
  });

  it("fakes success for bots that fill the honeypot and forwards nothing", async () => {
    const fetchMock = mockFetch();
    const res = await handler(post({ ...validBody, website: "http://spam.example" }));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    ["missing name", { name: "" }],
    ["name with digits", { name: "Juan 3" }],
    ["invalid email", { email: "juan@" }],
    ["non-PH phone", { phone: "12345" }],
    ["short message", { message: "hi" }],
    ["missing establishment type", { establishmentType: "" }],
  ])("rejects %s with 400", async (_label, override) => {
    const fetchMock = mockFetch();
    const res = await handler(post({ ...validBody, ...override }));
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("requires a Turnstile token", async () => {
    const fetchMock = mockFetch();
    const res = await handler(post({ ...validBody, turnstileToken: "" }));
    expect(res.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not forward when Cloudflare rejects the token", async () => {
    const fetchMock = mockFetch({ turnstileOk: false });
    const res = await handler(post(validBody));
    expect(res.status).toBe(403);
    expect(webhookCalls(fetchMock)).toHaveLength(0);
  });

  it("returns 502 when Make.com responds with an error", async () => {
    mockFetch({ webhookStatus: 500 });
    const res = await handler(post(validBody));
    expect(res.status).toBe(502);
  });
});
