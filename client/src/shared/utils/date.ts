/**
 * Converts a given number of seconds into a formatted string of hours, minutes, and seconds (HH:MM:SS).
 * The hours will only be included if the minutes reach 1 or more.
 *
 * @param {number} seconds - The total number of seconds to convert.
 * @returns {string} A string representing the time in the format HH:MM:SS or MM:SS.
 * @throws {Error} Will throw an error if the input seconds are negative.
 *
 * @example
 * formatSecondsToHMS(3661); // Returns "1:01:01"
 * formatSecondsToHMS(65);    // Returns "1:05"
 * formatSecondsToHMS(59);    // Returns "0:59"
 */
export function formatSecondsToHMS(seconds: number): string {
  if (seconds < 0) {
    throw new Error("Seconds cannot be negative");
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  } else {
    return `${minutes}:${String(secs).padStart(2, "0")}`;
  }
}
