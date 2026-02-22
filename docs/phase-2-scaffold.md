# Phase 2 — UI-first scaffold

## Install commands
```bash
npm install
npm run dev
```

## Generated structure
- Next.js App Router + TypeScript baseline config
- Tailwind CSS config and global styles
- Route stubs:
  - `/`
  - `/s`
  - `/listing/[id]`
  - `/sell`
  - `/favorites`
  - `/messages`
  - `/messages/[conversationId]`
  - `/auth/login`
  - `/auth/signup`
- Reusable components:
  - `SearchBar`
  - `CategoryGrid`
  - `ListingCard`
  - `FiltersPanel`
  - `SortDropdown`
  - `ImageGallery`
  - `SellerCard`
  - `MessageThread`
- Shared mock data + TypeScript marketplace types

## Notes
- This phase is intentionally mock-data-first.
- Supabase integration begins in later phases.
- Design language uses original BazaarLane branding while keeping a familiar classifieds UX pattern.
