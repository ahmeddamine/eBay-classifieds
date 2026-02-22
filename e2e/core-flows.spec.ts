import { expect, test } from "@playwright/test";

test("search URL persists filters", async ({ page }) => {
  await page.goto("/s?q=bike&city=Hamburg&sort=price_asc");
  await expect(page).toHaveURL(/q=bike/);
  await expect(page).toHaveURL(/city=Hamburg/);
});

test("listing detail shows login-gated message CTA", async ({ page }) => {
  await page.goto("/listing/l1");
  await expect(page.getByText(/you need an account to message this seller/i)).toBeVisible();
});
