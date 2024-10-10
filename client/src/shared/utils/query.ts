/**
 * Query keys for managing playlists in react-query.
 * This object defines the structure for caching and invalidating playlist-related queries.
 */
export const playListKeys = {
  all: ["playlists"] as const,
  /**
   * Returns the query key for fetching the list of playlists.
   * @returns {ReadonlyArray<string>} The query key for the playlist list.
   */
  list: () => [...playListKeys.all, "list"] as const,

  /**
   * Returns the query key for fetching the details of a specific playlist.
   * @param {string} id - The ID of the playlist.
   * @returns {ReadonlyArray<string>} The query key for the playlist detail.
   */
  detail: (id: string) => [...playListKeys.all, "detail", id] as const,
};

/**
 * Query keys for managing tracks in react-query.
 * This object defines the structure for caching and invalidating track-related queries.
 */
export const trackKeys = {
  all: ["tracks"] as const,
  /**
   * Returns the query key for fetching the list of tracks.
   * @returns {ReadonlyArray<string>} The query key for the track list.
   */
  lists: () => [...trackKeys.all, "list"] as const,

  /**
   * Returns the query key for fetching a list of tracks with specific filters.
   * @param {string} filters - The filters to apply when fetching the list of tracks.
   * @returns {ReadonlyArray<string>} The query key for the filtered track list.
   */
  list: (filters: string) => [...trackKeys.lists(), { filters }] as const,
};
