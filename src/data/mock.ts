import { Category, Conversation, Listing, Message } from "@/types/marketplace";

export const categories: Category[] = [
  { id: "c1", name: "Electronics", slug: "electronics", icon: "💻" },
  { id: "c2", name: "Home & Garden", slug: "home-garden", icon: "🏡" },
  { id: "c3", name: "Fashion", slug: "fashion", icon: "👕" },
  { id: "c4", name: "Vehicles", slug: "vehicles", icon: "🚗" },
  { id: "c5", name: "Hobbies", slug: "hobbies", icon: "🎸" },
  { id: "c6", name: "Kids", slug: "kids", icon: "🧸" }
];

export const listings: Listing[] = [
  {
    id: "l1",
    title: "iPhone 13 Pro 256GB — Alpine Green",
    price: 599,
    city: "Berlin",
    postedAt: "2h ago",
    imageUrl: "https://images.unsplash.com/photo-1592286927505-1def25115558?q=80&w=1200&auto=format&fit=crop",
    condition: "good",
    categorySlug: "electronics",
    seller: { id: "u1", name: "Mara K.", memberSince: "2021", listingCount: 12 },
    description: "Well maintained device with original box, battery health at 87%.",
    attributes: [
      { label: "Brand", value: "Apple" },
      { label: "Storage", value: "256 GB" },
      { label: "Color", value: "Alpine Green" }
    ]
  },
  {
    id: "l2",
    title: "Solid oak dining table, seats 6",
    price: 420,
    city: "Hamburg",
    postedAt: "5h ago",
    imageUrl: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
    condition: "like_new",
    categorySlug: "home-garden",
    seller: { id: "u2", name: "Tim S.", memberSince: "2019", listingCount: 8 },
    description: "Minimal signs of wear, pickup only.",
    attributes: [
      { label: "Material", value: "Oak" },
      { label: "Length", value: "180 cm" },
      { label: "Width", value: "90 cm" }
    ]
  },
  {
    id: "l3",
    title: "Commuter bike with basket",
    price: 230,
    city: "Munich",
    postedAt: "1d ago",
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1200&auto=format&fit=crop",
    condition: "used",
    categorySlug: "vehicles",
    seller: { id: "u3", name: "Lena R.", memberSince: "2020", listingCount: 4 },
    description: "Ready to ride and recently serviced.",
    attributes: [
      { label: "Frame", value: "M" },
      { label: "Type", value: "City bike" },
      { label: "Brakes", value: "Disc" }
    ]
  }
];

export const conversations: Conversation[] = [
  {
    id: "conv1",
    listingId: "l1",
    listingTitle: "iPhone 13 Pro 256GB — Alpine Green",
    counterpartName: "Mara K.",
    lastMessage: "Sure, pickup near Mitte works for me.",
    updatedAt: "12:41"
  }
];

export const messages: Message[] = [
  {
    id: "m1",
    conversationId: "conv1",
    sender: "them",
    text: "Hi, is this still available?",
    sentAt: "12:33"
  },
  {
    id: "m2",
    conversationId: "conv1",
    sender: "me",
    text: "Yes, it is available. Could pick up tomorrow.",
    sentAt: "12:37"
  },
  {
    id: "m3",
    conversationId: "conv1",
    sender: "them",
    text: "Sure, pickup near Mitte works for me.",
    sentAt: "12:41"
  }
];
