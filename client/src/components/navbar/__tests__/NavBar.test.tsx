import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "../NavBar";
import userEvent from "@testing-library/user-event";

describe("NavBar", () => {
  test("Renders logo and navigation links", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const logo = screen.getByRole("img", { name: /logo/i });
    expect(logo).toBeInTheDocument();

    const tracksLink = screen.getByText(/tracks/i);
    const playlistsLink = screen.getByText(/playlists/i);

    expect(tracksLink).toBeInTheDocument();
    expect(playlistsLink).toBeInTheDocument();
  });

  test("NavLink has active class when Track route is active", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const tracksLink = screen.getByRole("link", { name: /tracks/i });
    expect(tracksLink).toHaveClass("active");
  });

  test("NavLink has active class when Track route is inactive", async () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const playlistsLink = screen.getByRole("link", { name: /playlists/i });
    userEvent.click(playlistsLink);
    playlistsLink.click();

    await waitFor(() => expect(playlistsLink).not.toHaveClass("active"));
  });

  test("NavLink has active class when Playlists route is active", async () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const playlistsLink = screen.getByRole("link", { name: /playlists/i });
    userEvent.click(playlistsLink);
    playlistsLink.click();

    await waitFor(() => expect(playlistsLink).toHaveClass("active"));
  });
});
