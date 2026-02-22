export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          avatar_url: string | null;
          city: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          icon: string | null;
          parent_id: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
      };
      listings: {
        Row: {
          id: string;
          owner_id: string;
          category_id: string;
          title: string;
          description: string;
          price: number;
          is_negotiable: boolean;
          condition: "new" | "like_new" | "good" | "fair" | "used";
          city: string;
          postal_code: string | null;
          latitude: number | null;
          longitude: number | null;
          status: "draft" | "active" | "sold" | "archived";
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      listing_images: {
        Row: {
          id: string;
          listing_id: string;
          storage_path: string;
          public_url: string | null;
          sort_order: number;
          created_at: string;
        };
      };
      favorites: {
        Row: {
          profile_id: string;
          listing_id: string;
          created_at: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          listing_id: string;
          buyer_id: string;
          seller_id: string;
          created_at: string;
          updated_at: string;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          body: string;
          created_at: string;
        };
      };
    };
  };
};
