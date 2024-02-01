import { add, addDays, addMonths, addWeeks } from "date-fns";
import {
  convertAdditiveTimeToDate,
  processClearPhrases,
  processTimeUnits,
} from "../../src";
import { advanceTo, clear } from "jest-date-mock";

describe("convertAdditiveTimeToDate Correctly generates the right date", () => {
  let currentTime: Date;
  beforeAll(() => {
    advanceTo(new Date("2024-01-16T12:00:00")); // Mock the date
    currentTime = new Date("2024-01-16T12:00:00");
  });

  afterAll(() => {
    clear(); // Clear the mock
  });

  it("Test example: 2 days", () => {
    expect(convertAdditiveTimeToDate("2 days")).toBe(
      add(currentTime, { ["days"]: Number("2") }).toISOString(),
    );
  });

  it("Test example: 3 hours", () => {
    expect(convertAdditiveTimeToDate("3 hours")).toBe(
      add(currentTime, { ["hours"]: Number("3") }).toISOString(),
    );
  });

  it("Test example: 1 year", () => {
    expect(convertAdditiveTimeToDate("1 year")).toBe(
      add(currentTime, { ["years"]: Number("1") }).toISOString(),
    );
  });

  it("Test example: a year", () => {
    expect(convertAdditiveTimeToDate("a year")).toBe(
        add(currentTime, { ["years"]: Number("1") }).toISOString(),
    );
  });

  it("Test example: an hour", () => {
    expect(convertAdditiveTimeToDate("an hour")).toBe(
        add(currentTime, { ["hours"]: Number("1") }).toISOString(),
    );
  });

  it("Test example: three hours and 20 minutes", () => {
    expect(convertAdditiveTimeToDate("three hours and 20 minutes")).toBe(
      add(currentTime, {
        ["hours"]: Number("3"),
        ["minutes"]: Number("20"),
      }).toISOString(),
    );
  });

  it("Test example: 1 month, 2 weeks, five days and 20 minutes", () => {
    expect(
      convertAdditiveTimeToDate("1 month, 2 weeks, five days and 20 minutes"),
    ).toBe(
      add(currentTime, {
        ["months"]: Number("1"),
        ["weeks"]: Number("2"),
        ["days"]: Number("5"),
        ["minutes"]: Number("20"),
      }).toISOString(),
    );
  });

  it("Test example: tomorrow", () => {
    expect(convertAdditiveTimeToDate("tomorrow")).toBe(
      add(currentTime, { ["days"]: Number("1") }).toISOString(),
    );
  });

  it("Test example: next week", () => {
    expect(convertAdditiveTimeToDate("next week")).toBe(
      add(currentTime, { ["weeks"]: Number("1") }).toISOString(),
    );
  });

  it("Test example: next month", () => {
    expect(convertAdditiveTimeToDate("next month")).toBe(
      add(currentTime, { ["months"]: Number("1") }).toISOString(),
    );
  });

  it("Test example: next year", () => {
    expect(convertAdditiveTimeToDate("next year")).toBe(
      add(currentTime, { ["years"]: Number("1") }).toISOString(),
    );
  });

  it("Test example: invalid input", () => {
    expect(convertAdditiveTimeToDate("invalid input")).toBe("");
  });

  it("Test example: invalid input", () => {
    expect(convertAdditiveTimeToDate("invalid input days")).toBe("");
  });
});

describe("convertAdditiveTimeToDate Correctly generates the right date from large texts", () => {
  let currentTime: Date;
  beforeAll(() => {
    advanceTo(new Date("2024-01-16T12:00:00")); // Mock the date
    currentTime = new Date("2024-01-16T12:00:00");
  });

  afterAll(() => {
    clear(); // Clear the mock
  });

  it("Test example: 2 days 12 hours", () => {
    const input = "to get this done in 2 days, 12 hours";
    expect(convertAdditiveTimeToDate(input)).toBe(
      add(currentTime, {
        ["days"]: Number("2"),
        ["hours"]: Number("12"),
      }).toISOString(),
    );
  });

  it("Test example: 1 year 12 hours", () => {
    const input = "to get this done in 1 year and 12 hours";
    expect(convertAdditiveTimeToDate(input)).toBe(
      add(currentTime, {
        ["years"]: Number("1"),
        ["hours"]: Number("12"),
      }).toISOString(),
    );
  });

  it("Test example: 12 weeks 4 hours", () => {
    const input = "to get this done in 12 weeks, 4 hours";
    expect(convertAdditiveTimeToDate(input)).toBe(
      add(currentTime, {
        ["weeks"]: Number("12"),
        ["hours"]: Number("4"),
      }).toISOString(),
    );
  });
  it("Test example: 2 days from tomorrow", () => {
    const input = "to get this done in 2 days from tomorrow";
    expect(convertAdditiveTimeToDate(input)).toBe(
      add(currentTime, { ["days"]: Number("3") }).toISOString(),
    );
  });

  it("Test example: tomorrow at 9pm", () => {
    const input = "I will meet you tomorrow at 9pm";
    const expected = add(currentTime, { ["days"]: Number("1") });
    expect(convertAdditiveTimeToDate(input)).toBe(expected.toISOString());
  });
});

describe("processClearPhrases tests", () => {
  it("should add 1 day for 'tomorrow'", () => {
    const currentTime = new Date();
    const expectedResult = addDays(currentTime, 1);
    const result = processClearPhrases(currentTime, "tomorrow");
    expect(result).toEqual(expectedResult);
  });

  it("should add 1 week for 'next week'", () => {
    const currentTime = new Date();
    const expectedResult = addWeeks(currentTime, 1);
    const result = processClearPhrases(currentTime, "next week");
    expect(result).toEqual(expectedResult);
  });

  it("should add 1 month for 'next month'", () => {
    const currentTime = new Date();
    const expectedResult = addMonths(currentTime, 1);
    const result = processClearPhrases(currentTime, "next month");
    expect(result).toEqual(expectedResult);
  });

  it("should return the same date for unknown input", () => {
    const currentTime = new Date();
    const result = processClearPhrases(currentTime, "yesterday");
    expect(result).toEqual(currentTime);
  });
});

describe("Testing processTimeUnits function from time-decoding-utils module", () => {
  it("should process valid time units correctly", () => {
    // given
    const date = new Date("2023-05-01T00:00:00");
    const timeData = "2 hours";

    // when
    const [updatedDate, isError] = processTimeUnits(date, timeData);

    // then
    expect(updatedDate).toEqual(new Date("2023-05-01T02:00:00"));
    expect(isError).toBe(false);
  });

  it("should return same date and true if the time unit is invalid", () => {
    // given
    const date = new Date("2023-05-01T00:00:00");
    const timeData = "2 elephants";

    // when
    const [updatedDate, isError] = processTimeUnits(date, timeData);

    // then
    expect(updatedDate).toEqual(date); // same date should be returned
    expect(isError).toBe(true);
  });

  // continue defining more tests according to different function usages
});
