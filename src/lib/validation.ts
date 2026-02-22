export function validateListingInput(input: {
  title: string;
  description: string;
  price: string;
  city: string;
}): string | null {
  if (input.title.trim().length < 6) return "Title must be at least 6 characters.";
  if (input.description.trim().length < 20) return "Description must be at least 20 characters.";
  if (!input.price || Number.isNaN(Number(input.price)) || Number(input.price) < 0) {
    return "Price must be a valid number >= 0.";
  }
  if (input.city.trim().length < 2) return "City is required.";
  return null;
}
