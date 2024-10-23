/**
 * Returns the singular or plural form of a noun based on the count.
 *
 * @param {number} count - The number to determine singular or plural form.
 * @param {string} singular - The singular form of the noun.
 * @returns {string} A string with the count and the appropriately pluralized noun.
 *
 * @example
 * pluralize(1, "track");  // Returns "1 track"
 * pluralize(3, "track");  // Returns "3 tracks"
 * pluralize(0, "item");   // Returns "0 items"
 */
export function pluralize(count: number = 0, singular: string): string {
  const plural = `${singular}s`;
  return `${count} ${count === 1 ? singular : plural}`;
}
