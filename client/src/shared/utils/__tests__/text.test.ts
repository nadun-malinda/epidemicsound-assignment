import { pluralize } from "../text";

describe("pluralize", () => {
  test("Should return singular form of the text when count is 1", () => {
    expect(pluralize(1, "track")).toBe("1 track");
  });

  test("Should return plural form of the text when count is greater than 1", () => {
    expect(pluralize(3, "track")).toBe("3 tracks");
  });

  test("Should return plural form of the text when count is 0", () => {
    expect(pluralize(0, "track")).toBe("0 tracks");
  });

  test("Should return plural form of the text when count is negative", () => {
    expect(pluralize(-2, "track")).toBe("-2 tracks");
  });

  test("Should return plural form of the text when count is undefined", () => {
    // Defaults to "0"
    expect(pluralize(undefined, "track")).toBe("0 tracks");
  });
});
