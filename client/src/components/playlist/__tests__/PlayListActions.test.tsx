import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PlayListActions } from "../PlayListActions";
import { PlayListDeleteDialog } from "../PlayListDeleteDialog";
import { mockPlayList } from "../../../../tests/mocks/playlist";

// Mock the PlayListDeleteDialog component
jest.mock("../PlayListDeleteDialog", () => ({
  PlayListDeleteDialog: jest.fn(() => <div>Mocked Delete Dialog</div>),
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("PlayListActions component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should renders delete button", () => {
    render(<PlayListActions playList={mockPlayList} />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
  });

  test("Should opens the PlayListDeleteDialog when delete button is clicked", async () => {
    render(<PlayListActions playList={mockPlayList} />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(PlayListDeleteDialog).toHaveBeenCalledWith(
        expect.objectContaining({
          open: true,
          playList: mockPlayList,
        }),
        {}
      );
    });
  });

  test("Should closes PlayListDeleteDialog when cancel is clicked", async () => {
    (PlayListDeleteDialog as jest.Mock).mockImplementation(({ onClose }) => (
      <div>
        <button onClick={onClose}>Cancel</button>
      </div>
    ));

    render(<PlayListActions playList={mockPlayList} />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(PlayListDeleteDialog).toHaveBeenCalledWith(
        expect.objectContaining({
          open: false,
        }),
        {}
      );
    });
  });
});
