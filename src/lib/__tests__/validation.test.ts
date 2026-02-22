import { describe, expect, it } from "vitest";
import { validateListingInput } from "../validation";

describe("validateListingInput", () => {
  it("returns null for valid listing input", () => {
    expect(
      validateListingInput({
        title: "iPhone 13 Pro",
        description: "Very good condition, includes original box and charger.",
        price: "599",
        city: "Berlin"
      })
    ).toBeNull();
  });

  it("rejects invalid title/description/price/city", () => {
    expect(validateListingInput({ title: "abc", description: "valid description with enough chars", price: "1", city: "Berlin" })).toBe(
      "Title must be at least 6 characters."
    );
    expect(validateListingInput({ title: "Valid title", description: "short", price: "1", city: "Berlin" })).toBe(
      "Description must be at least 20 characters."
    );
    expect(validateListingInput({ title: "Valid title", description: "long enough description for test", price: "-2", city: "Berlin" })).toBe(
      "Price must be a valid number >= 0."
    );
    expect(validateListingInput({ title: "Valid title", description: "long enough description for test", price: "10", city: "B" })).toBe(
      "City is required."
    );
  });
});
