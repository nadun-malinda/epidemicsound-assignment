import { formatSecondsToHMS } from "../date";

describe("formatSecondsToHMS", () => {
  test("Sshould correctly format seconds into HH:MM:SS when hours are present", () => {
    expect(formatSecondsToHMS(3661)).toBe("1:01:01"); // 1 hour, 1 minute, 1 second
    expect(formatSecondsToHMS(7322)).toBe("2:02:02"); // 2 hours, 2 minutes, 2 seconds
  });

  test("Should correctly format seconds into MM:SS when hours are absent", () => {
    expect(formatSecondsToHMS(65)).toBe("1:05"); // 1 minute, 5 seconds
    expect(formatSecondsToHMS(59)).toBe("0:59"); // 0 minutes, 59 seconds
    expect(formatSecondsToHMS(120)).toBe("2:00"); // 2 minutes, 0 seconds
  });

  test('Should correctly return "0:00" for 0 seconds', () => {
    expect(formatSecondsToHMS(0)).toBe("0:00");
  });

  test("Should correctly throw an error for negative seconds", () => {
    expect(() => formatSecondsToHMS(-1)).toThrow("Seconds cannot be negative");
  });

  test("Should correctly format less than 1 minute", () => {
    expect(formatSecondsToHMS(5)).toBe("0:05"); // 0 minutes, 5 seconds
    expect(formatSecondsToHMS(9)).toBe("0:09"); // 0 minutes, 9 seconds
  });
});
