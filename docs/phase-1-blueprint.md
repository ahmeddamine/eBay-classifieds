# BazaarLane — Phase 1 Product + Technical Blueprint

## 1) Core User Journeys

### A. Browse / Search
1. User lands on Home and sees search bar + categories + recent listings.
2. User enters keyword/category/city and submits.
3. User lands on `/s` with URL-driven filters.
4. User refines results via sidebar/mobile filter drawer.
5. User opens listing detail from result card.

### B. View Listing
1. User opens `/listing/[id]`.
2. User browses gallery, price, attributes, and seller info.
3. User can save to favorites or message seller.
4. If unauthenticated, actions open auth gate (login/signup CTA).

### C. Sign Up / Login
1. User selects login/signup from top nav or gated action.
2. User completes auth form.
3. User returns to intended page/action (favorites, messaging, posting).

### D. Post Listing
1. Authenticated user opens `/sell`.
2. User fills structured form (title, category, price, condition, location, description, images).
3. User previews and submits listing.
4. Listing appears as active in marketplace and in “My listings”.

### E. Favorite Listing
1. User taps heart icon on card/detail.
2. If logged in, listing saved to favorites and reflected in `/favorites`.
3. If logged out, login gate appears.

### F. Message Seller
1. User clicks “Message seller” on listing detail.
2. If logged in, conversation is opened/created.
3. User lands in `/messages/[conversationId]` with thread and compose box.
4. Inbox `/messages` shows latest conversations.

## 2) Page Map
- `/` Home
- `/s` Search results
- `/listing/[id]` Listing detail
- `/sell` Sell/Post listing
- `/auth/login` Login
- `/auth/signup` Signup
- `/favorites` Favorites
- `/messages` Inbox
- `/messages/[conversationId]` Thread
- `/profile` My listings / profile management (Phase 2 stub)

## 3) Component Inventory per Page

### Home (`/`)
- `TopNav`
- `SearchBar`
- `CategoryGrid`
- `ListingSection` (recent listings with `ListingCard`)

### Search (`/s`)
- `TopNav`
- `SearchBar` (sticky on desktop)
- `FiltersPanel` (sidebar) + `MobileFiltersDrawer`
- `SortDropdown`
- `ListingResults` using `ListingCard`
- `PaginationControls`

### Listing Detail (`/listing/[id]`)
- `ImageGallery`
- `ListingHeader` (title, price, metadata)
- `ListingAttributesTable`
- `ListingDescription`
- `SellerCard`
- `FavoriteButton`
- `MessageSellerButton`

### Sell (`/sell`)
- `PostListingForm`
- `ImageUploader`
- `LocationPicker` (MVP text input)
- `FormActions`

### Auth (`/auth/login`, `/auth/signup`)
- `AuthCard`
- `AuthForm`

### Favorites (`/favorites`)
- `FavoritesGrid`
- `ListingCard`
- `EmptyState`

### Messages (`/messages`, `/messages/[conversationId]`)
- `ConversationList`
- `MessageThread`
- `MessageComposer`
- `EmptyConversationState`

### Profile (`/profile`)
- `ProfileSummary`
- `MyListingsTable`
- `ListingStatusPills`

## 4) Search URL / Query Param Map

Base path: `/s`

- `q`: free-text keyword (title/description)
- `category`: slug/id (`electronics`, `vehicles`)
- `city`: city slug or text (`berlin`)
- `radius`: km (`5`, `10`, `25`, `50`, `100`)
- `minPrice`: number
- `maxPrice`: number
- `condition`: enum (`new`, `like_new`, `good`, `fair`, `used`)
- `sort`: enum (`newest`, `price_asc`, `price_desc`, `distance`)
- `page`: pagination index (1-based)

Example:
`/s?q=iphone&category=electronics&city=hamburg&radius=25&minPrice=100&maxPrice=500&condition=good&sort=newest&page=2`

## 5) Data Model (ERD in text)

- `profiles` (1) —— (N) `listings`
- `categories` (1) —— (N) `listings`
- `listings` (1) —— (N) `listing_images`
- `profiles` (N) —— (N) `listings` via `favorites`
- `profiles` (N) —— (N) `conversations` via participants (`buyer_id`, `seller_id`)
- `conversations` (1) —— (N) `messages`
- `listings` (1) —— (N) `conversations`

Core entities:
- `profiles`: user display data
- `categories`: taxonomy for search/posting
- `listings`: primary marketplace object
- `listing_images`: ordered media for listing gallery
- `favorites`: saved listings by user
- `conversations`: unique buyer-seller thread per listing
- `messages`: chat content and timestamps

## 6) MVP Scope (Realistic V1)

### In scope
- Fast, responsive UI for browse/search/detail
- URL-driven search filters + sorting
- Auth (email/password)
- Post listing with basic validation and image upload
- Listing detail with seller CTA
- Favorites (save/remove + list view)
- Messaging MVP (inbox + thread + send message)

### Out of scope (later)
- Payments/checkout
- Advanced moderation workflow
- Multi-language localization
- SEO schema optimization beyond baseline metadata
- Push notifications / email digests
- Complex ranking/recommendation system
