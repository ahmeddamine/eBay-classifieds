import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SearchBar } from "../search/search-bar";

describe("SearchBar", () => {
  it("renders defaults from URL-like values", () => {
    render(<SearchBar values={{ q: "iphone", city: "Berlin", category: "electronics" }} />);

    expect(screen.getByPlaceholderText("What are you looking for?")).toHaveValue("iphone");
    expect(screen.getByPlaceholderText("City")).toHaveValue("Berlin");
    expect(screen.getByRole("combobox")).toHaveValue("electronics");
  });

  it("posts to /s by default", () => {
    const { container } = render(<SearchBar values={{}} />);
    const form = container.querySelector("form");
    expect(form).toHaveAttribute("action", "/s");
  });
});
