# Phase 7 — Favorites + messaging MVP

## Delivered
- Favorites
  - Added favorite/unfavorite toggle on listing detail seller card
  - Added auth gate redirect for favorite action when unauthenticated
  - Reworked `/favorites` to fetch current user favorites from Supabase
- Messaging
  - Added "Message seller" action on listing detail
  - Creates conversation if none exists (buyer + seller + listing unique path)
  - Reworked `/messages` inbox to list conversation threads for current user
  - Reworked `/messages/[conversationId]` to load/send messages
  - Added basic realtime updates for new messages using Supabase channel subscription

## Notes
- Uses existing Phase 3 RLS and schema (`favorites`, `conversations`, `messages`).
- Requires authenticated user session for all favorite and messaging routes/actions.
