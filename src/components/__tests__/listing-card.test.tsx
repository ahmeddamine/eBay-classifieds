import { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ListingCard } from "../listing/listing-card";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => <a href={href}>{children}</a>
}));

describe("ListingCard", () => {
  it("renders listing information", () => {
    render(
      <ListingCard
        listing={{
          id: "l1",
          title: "iPhone 13 Pro",
          price: 599,
          city: "Berlin",
          postedAt: "2h ago",
          imageUrl: "https://example.com/a.jpg",
          condition: "good",
          categorySlug: "electronics",
          sellerType: "private",
          ships: true,
          seller: { id: "u1", name: "Seller", memberSince: "2021", listingCount: 2 },
          description: "Great phone",
          attributes: []
        }}
      />
    );

    expect(screen.getByText("€599")).toBeInTheDocument();
    expect(screen.getByText("iPhone 13 Pro")).toBeInTheDocument();
    expect(screen.getByText(/Berlin/)).toBeInTheDocument();
  });
});
