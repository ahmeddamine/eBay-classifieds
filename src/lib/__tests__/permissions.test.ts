import { describe, expect, it } from "vitest";
import { canAccessConversation, canEditListing } from "../permissions";

describe("permission guards", () => {
  it("checks owner-only listing edits", () => {
    expect(canEditListing("u1", "u1")).toBe(true);
    expect(canEditListing("u1", "u2")).toBe(false);
    expect(canEditListing(null, "u2")).toBe(false);
  });

  it("checks conversation participant access", () => {
    const conversation = { buyer_id: "buyer", seller_id: "seller" };
    expect(canAccessConversation("buyer", conversation)).toBe(true);
    expect(canAccessConversation("seller", conversation)).toBe(true);
    expect(canAccessConversation("other", conversation)).toBe(false);
  });
});
