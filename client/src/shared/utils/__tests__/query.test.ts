import { playListKeys, trackKeys } from "../query";

describe("playListKeys", () => {
  test("Should return correct key for all playlists", () => {
    expect(playListKeys.all).toEqual(["playlists"]);
  });

  test("Should return correct key for playlist list", () => {
    expect(playListKeys.list()).toEqual(["playlists", "list"]);
  });

  test("Should return correct key for playlist detail", () => {
    const id = "123";
    expect(playListKeys.detail(id)).toEqual(["playlists", "detail", "123"]);
  });
});

describe("trackKeys", () => {
  test("Should return correct key for all tracks", () => {
    expect(trackKeys.all).toEqual(["tracks"]);
  });

  test("Should return correct key for track lists", () => {
    expect(trackKeys.lists()).toEqual(["tracks", "list"]);
  });

  test("Should return correct key for filtered track list", () => {
    const filters = "123";
    expect(trackKeys.list(filters)).toEqual([
      "tracks",
      "list",
      { filters: "123" },
    ]);
  });
});
