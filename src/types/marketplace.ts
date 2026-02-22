export type ListingCondition = "new" | "like_new" | "good" | "fair" | "used";

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
};

export type Listing = {
  id: string;
  title: string;
  price: number;
  city: string;
  postedAt: string;
  imageUrl: string;
  condition: ListingCondition;
  categorySlug: string;
  seller: {
    id: string;
    name: string;
    memberSince: string;
    listingCount: number;
  };
  description: string;
  attributes: Array<{ label: string; value: string }>;
};

export type Conversation = {
  id: string;
  listingId: string;
  listingTitle: string;
  counterpartName: string;
  lastMessage: string;
  updatedAt: string;
};

export type Message = {
  id: string;
  conversationId: string;
  sender: "me" | "them";
  text: string;
  sentAt: string;
};
