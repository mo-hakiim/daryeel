<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- All UI text lives in `src/i18n/en.ts` with a mirrored `src/i18n/so.ts` (typed `Dictionary`); components read strings via `useI18n()`, never hardcode copy — keeps both languages complete.
- Language choice is stored in the `dw_lang` cookie and read in the root `beforeLoad` (`readSavedLang`) so SSR renders the saved language without a flash.
- Products are data, not components: edit `src/data/products.ts` (bilingual fields, `benefits: null` = pending verification); images are `.webp` files in `src/assets/products/` resolved by `src/data/images.ts`.
- Official contact details and WhatsApp link building live only in `src/lib/contact.ts`; forms submit by opening WhatsApp (no backend), built in `src/lib/messages.ts`.
- `src/test/site-rules.test.ts` guards contact details, WhatsApp messages, catalogue structure and translation completeness — run `bunx vitest run` after content changes.
