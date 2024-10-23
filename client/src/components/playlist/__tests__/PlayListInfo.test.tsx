import { render, screen } from "@testing-library/react";
import { PlayListInfo } from "../PlayListInfo";
import { mockPlayList } from "../../../../tests/mocks/playlist";

describe("PlayListInfo Component", () => {
  test("Should display the playlist's title, description, track count, and created date", () => {
    render(<PlayListInfo playList={mockPlayList} />);

    // Assert that the playlist name is displayed
    expect(screen.getByText(/My Playlist/i)).toBeInTheDocument();

    // Assert that the description is displayed
    expect(screen.getByText(/A playlist for testing/i)).toBeInTheDocument();

    // Assert that the track count is correctly pluralized
    expect(screen.getByText(/1 track/i)).toBeInTheDocument();

    // Assert that the created date is correctly formatted
    const formattedDate = new Date(mockPlayList.created_at).toLocaleString();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  test("Should render an empty playlist image", async () => {
    render(<PlayListInfo playList={mockPlayList} />);

    const img = screen.getByRole("img", { name: /Empty playlist/i });
    expect(img).toBeInTheDocument();
    await expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("playlist-empty.png")
    );
  });
});
