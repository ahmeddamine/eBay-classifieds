# Phase 3 — Database schema + Supabase RLS

This phase adds a Supabase SQL migration at:

- `supabase/migrations/20260222173000_phase3_schema.sql`

## Included
- Tables:
  - `profiles`
  - `categories`
  - `listings`
  - `listing_images`
  - `favorites`
  - `conversations`
  - `messages`
- Enums:
  - `listing_condition`
  - `listing_status`
- Relationship constraints + integrity checks
- Search/sort indexes for listing discovery and messaging performance
- Seed categories (idempotent upsert by `slug`)
- RLS policies implementing MVP access rules:
  - Public read of active listings
  - Authenticated listing creation
  - Owner-only listing updates/deletes
  - Participant-only conversation/message read+write
  - User-owned favorites management
