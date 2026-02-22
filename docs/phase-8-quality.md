# Phase 8 — Quality pass

## Test plan (checklist)
- [x] Browse/search listings render with valid defaults
- [x] Filter + sort URL parsing and URL persistence helpers
- [x] Listing detail auth-gated actions (favorite/message)
- [x] Login/signup behavior and redirect path handling
- [x] Create listing validation (title/description/price/city)
- [x] Favorites page auth + empty/error states
- [x] Messaging thread send flow + inbox routing baseline
- [x] Permission guard utility checks (owner + participants)
- [x] Price formatting helper checks
- [x] Mobile check target: search/filter and messaging pages (manual due env)

## QA audit highlights
1. High: Listing form redirect used `/sell` even in edit mode when unauthenticated.
2. High: Image upload failures were not surfaced clearly to users.
3. Medium: Search query param parsing/building duplicated in page logic (drift risk).
4. Medium: Message thread subscription cleanup had race-prone async pattern.
5. Medium: Missing automated tests for validation/query/permissions utilities.

## Implemented reliability fixes
- Fixed edit/create auth redirect branching in listing form.
- Added explicit image upload + metadata insert error handling.
- Extracted and centralized search param parse/build helpers.
- Reworked thread subscription lifecycle with deterministic cleanup.
- Added unit tests for highest-risk utility layers.
