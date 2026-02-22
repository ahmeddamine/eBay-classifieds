import { describe, expect, it } from "vitest";
import { formatPrice } from "../format";

describe("formatPrice", () => {
  it("formats euro prices", () => {
    expect(formatPrice(599)).toContain("599");
    expect(formatPrice(599)).toContain("€");
  });
});
