import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PlayListDeleteDialog } from "../PlayListDeleteDialog";
import { useDeletePlayListMutation } from "@/shared/data/playlists";
import { mockPlayList } from "../../../../tests/mocks/playlist";

// Mock the useDeletePlayListMutation hook
jest.mock("@/shared/data/playlists", () => ({
  useDeletePlayListMutation: jest.fn(),
}));

describe("PlayListDeleteDialog component", () => {
  const mockOnClose = jest.fn();
  const mockOnSuccess = jest.fn();
  const mockMutate = jest.fn();

  beforeEach(() => {
    (useDeletePlayListMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      isSuccess: false,
      isError: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("SHould renders the delete dialog with playlist details", () => {
    render(
      <PlayListDeleteDialog
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
        playList={mockPlayList}
      />
    );

    expect(
      screen.getByText(/are you sure you want to delete the playlist/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/My Playlist/i)).toBeInTheDocument();
    expect(screen.getByText(/1 Track/i)).toBeInTheDocument();
  });

  test("Should call the onClose handler when the Cancel button is clicked", () => {
    render(
      <PlayListDeleteDialog
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
        playList={mockPlayList}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("SHould call the delete mutation and onClose when the Delete button is clicked", () => {
    render(
      <PlayListDeleteDialog
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
        playList={mockPlayList}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockMutate).toHaveBeenCalledWith(1);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("SHould displays error snackbar if deletion fails", async () => {
    (useDeletePlayListMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      isSuccess: false,
      isError: true,
    });

    render(
      <PlayListDeleteDialog
        open={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
        playList={mockPlayList}
      />
    );

    await waitFor(() => {
      expect(
        screen.getByText(/failed to delete playlist/i)
      ).toBeInTheDocument();
    });
  });
});
