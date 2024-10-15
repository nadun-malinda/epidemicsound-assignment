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
  });

  test("Should have create new playlist button", async ({ page }) => {
    const button = page.getByTestId("playlist-create-button");
    await expect(button).toBeVisible();
  });

  test("Should open/close new playlist creation dialog when clicking on the button", async ({
    page,
  }) => {
    const button = page.getByTestId("playlist-create-button");
    await button.click();

    const dialog = page.getByRole("heading", { name: /New playlist/ });
    await expect(dialog).toBeVisible();

    await expect(page.getByLabel("name")).toBeVisible();
    await expect(page.getByLabel("description")).toBeVisible();

    const cancelBtn = page.getByRole("button", { name: /Cancel/ });
    await expect(cancelBtn).toBeVisible();
    await expect(page.getByRole("button", { name: /Create/ })).toBeVisible();

    await cancelBtn.click();
    await expect(dialog).toBeHidden();
  });

  test("Should validate the form with inputs", async ({ page }) => {
    const button = page.getByTestId("playlist-create-button");
    await button.click();

    const dialog = page.getByRole("heading", { name: /New playlist/ });
    await expect(dialog).toBeVisible();

    const nameInput = page.getByLabel("name");
    const descriptionInput = page.getByLabel("description");
    const createBtn = page.getByRole("button", { name: /Create/ });

    await createBtn.click();
    await expect(nameInput).toHaveAttribute("aria-invalid", "true");
    await expect(descriptionInput).toHaveAttribute("aria-invalid", "false");

    await nameInput.fill("Test playlist");
    await descriptionInput.fill("Test description");
    await expect(nameInput).toHaveAttribute("aria-invalid", "false");

    await createBtn.click();

    // Intercept the request to the API before navigating to the page
    await page.route("**/playlists/*", (route) => {
      route.fulfill({
        contentType: "application/json",
        body: JSON.stringify([
          { ...mockPlayList, name: "Test playlist", tracks: [] },
          mockPlayList,
        ]),
      });
    });

    await expect(dialog).toBeHidden();
    await expect(page.getByTestId(/playlists-page/)).toBeVisible();
  });
});
