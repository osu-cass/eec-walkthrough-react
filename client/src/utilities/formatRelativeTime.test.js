import {
  MS_PER_SECOND,
  MS_PER_MINUTE,
  MS_PER_HOUR,
  MS_PER_DAY,
  MS_PER_MONTH,
  MS_PER_YEAR
} from "./constants";
import {formatRelativeTime} from "./formatRelativeTime";

const now = new Date("2026-01-15T12:00:00.000Z");

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
});

afterEach(() => {
  vi.useRealTimers();
});

test.each([
  ["one second", MS_PER_SECOND, "1 second ago"],
  ["two minutes", 2 * MS_PER_MINUTE, "2 minutes ago"],
  ["one hour", MS_PER_HOUR, "1 hour ago"],
  ["one day", MS_PER_DAY, "1 day ago"],
  ["two months", 2 * MS_PER_MONTH, "2 months ago"],
  ["one year", MS_PER_YEAR, "1 year ago"]
])("formats an unaffected %s timestamp", (_label, elapsed, expected) => {
  const timestamp = new Date(now.getTime() - elapsed).toISOString();

  expect(formatRelativeTime(timestamp)).toBe(expected);
});
