import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("./components/navbar", () => ({
  NavBar: () => <div>NavBar Mock</div>,
}));
jest.mock("./components/tracks", () => ({
  TracksPage: () => <div>TracksPage Mock</div>,
}));
jest.mock("./components/playlists", () => ({
  PlayListsPage: () => <div>PlayListsPage Mock</div>,
}));
jest.mock("./components/playlist", () => ({
  PlayListPage: () => <div>PlayListPage Mock</div>,
}));

describe("App", () => {
  test("renders the NavBar and the TracksPage on the default route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // Ensure the NavBar is rendered
    expect(screen.getByText("NavBar Mock")).toBeInTheDocument();

    // Ensure the TracksPage is rendered on the default route "/"
    expect(screen.getByText("TracksPage Mock")).toBeInTheDocument();
  });

  test("renders the PlayListsPage on '/playlists' route", async () => {
    render(
      <MemoryRouter initialEntries={["/playlists"]}>
        <App />
      </MemoryRouter>
    );

    // Ensure the PlayListsPage is rendered
    expect(await screen.findByText("PlayListsPage Mock")).toBeInTheDocument();
  });

  test("renders the PlayListPage on '/playlists/:id' route", async () => {
    render(
      <MemoryRouter initialEntries={["/playlists/1"]}>
        <App />
      </MemoryRouter>
    );

    // Ensure the PlayListPage is rendered
    expect(await screen.findByText("PlayListPage Mock")).toBeInTheDocument();
  });
});
