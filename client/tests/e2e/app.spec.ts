import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("Should navigate to home", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Epidemic Sound Code Interview");

    const tracksLink = page.getByRole("link", { name: /Tracks/ });
    await expect(tracksLink).toHaveClass(/active/);

    const playListsLink = page.getByRole("link", { name: /Playlists/ });
    await expect(playListsLink).not.toHaveClass(/active/);

    await playListsLink.click();
    await expect(playListsLink).toHaveClass(/active/);
    await expect(tracksLink).not.toHaveClass(/active/);
  });
});
