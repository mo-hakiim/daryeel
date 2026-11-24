// Uploads the bundled product photos (src/assets/products/*.webp) into the
// "product-images" bucket, named "<key>.webp" to match supabase/seed.sql.
//
// It signs in as the shop admin (email + password), so the upload goes through the
// same Row Level Security as the dashboard. No service_role key is needed.
//
//   PowerShell:
//     $env:ADMIN_EMAIL = "owner@example.com"; $env:ADMIN_PASSWORD = "..."; node scripts/upload-images.mjs
//
// VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are read from .env (or the environment).
// Existing files with the same name are replaced.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
if (existsSync(`${root}.env`)) process.loadEnvFile(`${root}.env`);

const url = process.env.VITE_SUPABASE_URL?.replace(/\/+$/, "");
const anon = process.env.VITE_SUPABASE_ANON_KEY;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!url || !anon) fail("Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env first.");
if (!email || !password) fail("Set ADMIN_EMAIL and ADMIN_PASSWORD for the owner's admin account.");

const login = await fetch(`${url}/auth/v1/token?grant_type=password`, {
  method: "POST",
  headers: { apikey: anon, "content-type": "application/json" },
  body: JSON.stringify({ email, password }),
});
const session = await login.json();
if (!login.ok) fail(`Sign-in failed: ${session.error_description ?? session.msg ?? login.status}`);

const dir = `${root}src/assets/products`;
const files = readdirSync(dir).filter((f) => f.endsWith(".webp"));
let ok = 0;
for (const file of files) {
  const res = await fetch(`${url}/storage/v1/object/product-images/${encodeURIComponent(file)}`, {
    method: "POST",
    headers: {
      apikey: anon,
      authorization: `Bearer ${session.access_token}`,
      "content-type": "image/webp",
      "x-upsert": "true",
      "cache-control": "max-age=31536000",
    },
    body: readFileSync(`${dir}/${file}`),
  });
  if (res.ok) {
    ok++;
    console.log(`✓ ${file}`);
  } else {
    console.error(`✗ ${file}: ${res.status} ${await res.text()}`);
  }
}
console.log(`\nUploaded ${ok} of ${files.length} photos.`);
if (ok !== files.length) process.exitCode = 1;

function fail(message) {
  console.error(message);
  process.exit(1);
}
