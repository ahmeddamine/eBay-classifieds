# Phase 6 — Auth + posting flow

## Delivered
- Auth flows:
  - Login page wired to `supabase.auth.signInWithPassword`
  - Signup page wired to `supabase.auth.signUp`
  - Logout action in top navigation
- Protected UX:
  - `/sell`, `/my-listings`, and `/sell/[id]/edit` redirect unauthenticated users to login
- Posting flow:
  - Create listing form with client-side validation for title, description, price, and city
  - Category/condition selection and photo upload support
  - Creates listing record in `listings`
  - Uploads images to Supabase Storage bucket `listing-images`
  - Inserts uploaded file metadata into `listing_images`
- My listings:
  - `/my-listings` lists owner-owned listings and links to edit
- Edit flow:
  - `/sell/[id]/edit` loads owner listing only and saves updates

## Required setup
- Supabase storage bucket: `listing-images` (public read suggested for MVP)
- Existing Phase 3 schema + RLS migration
- Env vars:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
