import { test, expect } from "@playwright/test";
import { mockPlayList } from "../mocks/playlist";

test.describe("Playlists", () => {
  test.beforeEach(async ({ page }) => {
    // Intercept the request to the API before navigating to the page
    await page.route("**/playlists/", (route) => {
      route.fulfill({
        contentType: "application/json",
        body: JSON.stringify([mockPlayList]),
      });
    });

    await page.goto("/playlists");
  });

  test("Should display playlists", async ({ page }) => {
    await expect(page.getByTestId(/playlists-page/)).toBeVisible();

    const button = page.getByTestId("playlist-create-button");
    await expect(button).toBeVisible();

    await button.click();
    const dialog = page.getByRole("heading", { name: /New playlist/ });
    await expect(dialog).toBeVisible();
  });
});
