import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FiltersPanel } from "../search/filters-panel";

describe("FiltersPanel", () => {
  it("hydrates control values from filter state", () => {
    render(
      <FiltersPanel
        values={{
          category: "electronics",
          minPrice: "100",
          maxPrice: "500",
          condition: "good",
          sellerType: "private",
          shipping: "yes",
          q: "iphone",
          city: "Hamburg",
          sort: "price_desc"
        }}
      />
    );

    expect(screen.getByDisplayValue("100")).toBeInTheDocument();
    expect(screen.getByDisplayValue("500")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});
