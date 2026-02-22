import { describe, expect, it } from "vitest";
import { buildSearchPageUrl, parseSearchFilters } from "../search-params";

describe("search param helpers", () => {
  it("parses string and array values consistently", () => {
    const filters = parseSearchFilters({
      q: ["iphone", "ignored"],
      category: "electronics",
      city: "Berlin",
      sort: undefined,
      page: undefined
    });

    expect(filters.q).toBe("iphone");
    expect(filters.sort).toBe("newest");
    expect(filters.page).toBe("1");
  });

  it("builds stable url with page override", () => {
    const url = buildSearchPageUrl({ q: "bike", city: "Hamburg", sort: "price_asc", page: "9" }, 2);
    expect(url).toContain("/s?");
    expect(url).toContain("q=bike");
    expect(url).toContain("city=Hamburg");
    expect(url).toContain("sort=price_asc");
    expect(url).toContain("page=2");
  });
});
