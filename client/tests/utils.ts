/**
 * Mocks the `console.error` method to prevent actual error messages from being logged in the console.
 *
 * @returns {jest.SpyInstance} - A Jest spy instance that can be restored later with `.mockRestore()`.
 */
export function mockConsoleError() {
  const consoleMock = jest.spyOn(console, "error");
  consoleMock.mockImplementation(() => undefined);
  return consoleMock;
}
