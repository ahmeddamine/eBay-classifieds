# Phase 5 — Real data integration (Supabase)

## Delivered
- Added a typed Supabase client helper for server-side fetching:
  - `src/lib/supabase/server.ts`
- Added lightweight typed DB model:
  - `src/types/supabase.ts`
- Added typed listing query helpers:
  - `getRecentListings`
  - `searchListings`
  - `getListingById`
  - file: `src/lib/listings.ts`

## Page integration
- Home (`/`) now fetches recent listings from Supabase when env vars exist.
- Search (`/s`) now fetches filtered/sorted/paginated results from Supabase and keeps URL-driven params.
- Listing detail (`/listing/[id]`) now fetches listing data from Supabase by id.

## Fallback strategy
If Supabase env vars are missing or a query fails, pages fall back to mock data so the UI remains usable in local/demo environments.

## Required env vars
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
