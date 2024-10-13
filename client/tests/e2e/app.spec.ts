import { test, expect } from "@playwright/test";

test("Should navigate to home", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Epidemic Sound Code Interview");

  await page.click("text=Playlists");
  await expect(page).toHaveURL("/playlists");
});
