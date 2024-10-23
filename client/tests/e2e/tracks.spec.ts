import { test, expect } from "@playwright/test";
import { mockTracks } from "../mocks/tracks";
import { mockPlayList } from "../mocks/playlist";

test.describe("Tracks", () => {
  test.beforeEach(async ({ page }) => {
    // Intercept the request to the API before navigating to the page
    await page.route("**/tracks/", (route) => {
      route.fulfill({
        contentType: "application/json",
        body: JSON.stringify(mockTracks),
      });
    });

    await page.goto("/");
  });

  test("Should display tracks", async ({ page }) => {
    await expect(page.getByTestId(/tracklist/)).toBeVisible();

    const trackRow = page.getByTestId(/track-row/);
    await expect(trackRow).toHaveCount(mockTracks.length);

    // Verify the titles of the tracks
    await expect(trackRow.nth(0).getByText(mockTracks[0].title)).toBeVisible();
    await expect(trackRow.nth(1).getByText(mockTracks[1].title)).toBeVisible();
  });

  test("Should open add to playlist dialog when clicking the button", async ({
    page,
  }) => {
    // playlist trigger buttons
    const button = page.getByTestId("add-to-playlist-trigger");

    // verify evry row has a button
    await expect(button).toHaveCount(mockTracks.length);

    await button.nth(0).click();

    // Intercept the request to the API before navigating to the page
    await page.route("**/playlists/", (route) => {
      route.fulfill({
        contentType: "application/json",
        body: JSON.stringify([mockPlayList]),
      });
    });

    const dialog = page.getByText("Add to playlists");
    await expect(dialog).toBeVisible();

    const addToPlayListButton = page.getByTestId("add-to-playlist-button");
    await expect(addToPlayListButton).toBeVisible();
    await expect(page.getByTestId("playlist-row")).toHaveCount(1);
    await expect(page.getByText(mockPlayList.name)).toBeVisible();
    await expect(
      page.getByText(`${mockPlayList.tracks.length} track`)
    ).toBeVisible();

    await addToPlayListButton.click();
    await expect(dialog).toBeHidden();
  });
});
