// Minimal Supabase client (REST + Auth + Storage) over fetch — no SDK needed.
// Only the public anon key is used in the browser. Row Level Security in
// supabase/schema.sql decides what each request may do.

const RAW_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? "";
const ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? "";

export const SUPABASE_URL = RAW_URL.replace(/\/+$/, "");
// A URL that is not http(s) (e.g. a key pasted into the URL setting) counts as not configured.
export const supabaseEnabled = /^https?:\/\/[^/]+/.test(SUPABASE_URL) && Boolean(ANON_KEY);
export const IMAGE_BUCKET = "product-images";

const SESSION_KEY = "dw_admin_session";
const TIMEOUT_MS = 10_000;

export class SupabaseError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
  }
}

export type Session = {
  access_token: string;
  refresh_token: string;
  expires_at: number; // unix seconds
  user: { id: string; email?: string };
};

/** Public URL of a file in the product-images bucket. */
export function storageUrl(path: string) {
  return `${SUPABASE_URL}/storage/v1/object/public/${IMAGE_BUCKET}/${path.split("/").map(encodeURIComponent).join("/")}`;
}

async function request(path: string, init: RequestInit & { token?: string | undefined } = {}) {
  if (!supabaseEnabled) throw new SupabaseError("Supabase is not configured", 0);
  const { token, headers, ...rest } = init;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${SUPABASE_URL}${path}`, {
      ...rest,
      signal: ctrl.signal,
      // Anonymous requests send only the public key (works with legacy anon JWTs and the
      // newer sb_publishable_ keys); signed-in requests add the user's access token.
      headers: {
        apikey: ANON_KEY,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });
    const text = await res.text();
    const body = text ? safeJson(text) : null;
    if (!res.ok) {
      const b = (body ?? {}) as Record<string, unknown>;
      const msg = String(
        b["message"] ?? b["error_description"] ?? b["msg"] ?? b["error"] ?? res.statusText,
      );
      throw new SupabaseError(msg, res.status, b["code"] ? String(b["code"]) : undefined);
    }
    return body;
  } catch (e) {
    if (e instanceof SupabaseError) throw e;
    throw new SupabaseError(
      ctrl.signal.aborted ? "Supabase did not respond in time" : "Could not reach Supabase",
      0,
    );
  } finally {
    clearTimeout(timer);
  }
}

function safeJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/* ---------------- Database (PostgREST) ---------------- */

export async function select<T>(table: string, query = "select=*", token?: string) {
  return (await request(`/rest/v1/${table}?${query}`, { token })) as T[];
}

export async function insert<T>(table: string, row: Record<string, unknown>, token: string) {
  const out = (await request(`/rest/v1/${table}`, {
    method: "POST",
    token,
    headers: { "content-type": "application/json", prefer: "return=representation" },
    body: JSON.stringify(row),
  })) as T[];
  return out[0]!;
}

export async function update<T>(
  table: string,
  id: string,
  patch: Record<string, unknown>,
  token: string,
) {
  const out = (await request(`/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    token,
    headers: { "content-type": "application/json", prefer: "return=representation" },
    body: JSON.stringify(patch),
  })) as T[];
  if (!out.length) throw new SupabaseError("Nothing was saved — you may not have permission.", 403);
  return out[0]!;
}

export async function remove(table: string, id: string, token: string) {
  const out = (await request(`/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    token,
    headers: { prefer: "return=representation" },
  })) as unknown[];
  if (!out.length)
    throw new SupabaseError("Nothing was deleted — you may not have permission.", 403);
}

/* ---------------- Storage ---------------- */

export async function uploadImage(path: string, file: Blob, token: string) {
  await request(
    `/storage/v1/object/${IMAGE_BUCKET}/${path.split("/").map(encodeURIComponent).join("/")}`,
    {
      method: "POST",
      token,
      headers: {
        "content-type": file.type || "application/octet-stream",
        "cache-control": "max-age=31536000",
        "x-upsert": "false",
      },
      body: file,
    },
  );
  return path;
}

/* ---------------- Auth ---------------- */

function toSession(body: Record<string, unknown>): Session {
  const expiresIn = Number(body["expires_in"] ?? 3600);
  return {
    access_token: String(body["access_token"]),
    refresh_token: String(body["refresh_token"]),
    expires_at: Number(body["expires_at"] ?? Math.floor(Date.now() / 1000) + expiresIn),
    user: body["user"] as Session["user"],
  };
}

function saveSession(s: Session | null) {
  try {
    if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    /* storage unavailable (private mode) — session lasts for this page only */
  }
}

export async function signIn(email: string, password: string) {
  const body = (await request("/auth/v1/token?grant_type=password", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  })) as Record<string, unknown>;
  const s = toSession(body);
  saveSession(s);
  return s;
}

export async function signOut(session: Session | null) {
  saveSession(null);
  if (session)
    await request("/auth/v1/logout", { method: "POST", token: session.access_token }).catch(
      () => {},
    );
}

/** The stored session, refreshed when it is about to expire. Null when signed out. */
export async function getSession(): Promise<Session | null> {
  let stored: Session | null = null;
  try {
    stored = JSON.parse(localStorage.getItem(SESSION_KEY) ?? "null");
  } catch {
    stored = null;
  }
  if (!stored?.refresh_token) return null;
  if (stored.expires_at - 60 > Date.now() / 1000) return stored;
  try {
    const body = (await request("/auth/v1/token?grant_type=refresh_token", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ refresh_token: stored.refresh_token }),
    })) as Record<string, unknown>;
    const s = toSession(body);
    saveSession(s);
    return s;
  } catch (e) {
    if (e instanceof SupabaseError && e.status >= 400 && e.status < 500) saveSession(null);
    return null;
  }
}

export async function isAdmin(session: Session) {
  const rows = await select<{ user_id: string }>(
    "admins",
    `select=user_id&user_id=eq.${session.user.id}`,
    session.access_token,
  );
  return rows.length > 0;
}
