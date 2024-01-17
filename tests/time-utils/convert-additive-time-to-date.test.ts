import { add, addDays, addMonths, addWeeks } from "date-fns";
import {
  convertAdditiveTimeToDate,
  processClearPhrases,
  processTimeUnits,
} from "../../src";
import { advanceTo, clear } from "jest-date-mock";

describe("convertAdditiveTimeToDate Correctly generates the right date", () => {
  beforeAll(() => {
    advanceTo(new Date("2024-01-16T12:00:00")); // Mock the date
  });

  afterAll(() => {
    clear(); // Clear the mock
  });
  let currentTime = new Date("2024-01-16T12:00:00");
  let exampleStrings = [
    "2 days",
    "3 hours",
    "1 year",
    "three hours and 20 minutes",
    "1 month, 2 weeks, five days and 20 minutes",
    "tomorrow",
    "next week",
    "next month",
    "invalid input",
  ];

  it("Test example: 2 days", () => {
    expect(convertAdditiveTimeToDate(exampleStrings[0])).toBe(
      add(currentTime, { ["days"]: Number("2") }).toISOString(),
    );
  });

  it("Test example: 3 hours", () => {
    expect(convertAdditiveTimeToDate(exampleStrings[1])).toBe(
      add(currentTime, { ["hours"]: Number("3") }).toISOString(),
    );
  });

  it("Test example: 1 year", () => {
    expect(convertAdditiveTimeToDate(exampleStrings[2])).toBe(
      add(currentTime, { ["years"]: Number("1") }).toISOString(),
    );
  });

  it("Test example: three hours and 20 minutes", () => {
    expect(convertAdditiveTimeToDate(exampleStrings[3])).toBe(
      add(currentTime, {
        ["hours"]: Number("3"),
        ["minutes"]: Number("20"),
      }).toISOString(),
    );
  });

  it("Test example: 1 month, 2 weeks, five days and 20 minutes", () => {
    expect(convertAdditiveTimeToDate(exampleStrings[4])).toBe(
      add(currentTime, {
        ["months"]: Number("1"),
        ["weeks"]: Number("2"),
        ["days"]: Number("5"),
        ["minutes"]: Number("20"),
      }).toISOString(),
    );
  });

  it("Test example: tomorrow", () => {
    expect(convertAdditiveTimeToDate(exampleStrings[5])).toBe(
      add(currentTime, { ["days"]: Number("1") }).toISOString(),
    );
  });

  it("Test example: next week", () => {
    expect(convertAdditiveTimeToDate(exampleStrings[6])).toBe(
      add(currentTime, { ["weeks"]: Number("1") }).toISOString(),
    );
  });

  it("Test example: next month", () => {
    expect(convertAdditiveTimeToDate(exampleStrings[7])).toBe(
      add(currentTime, { ["months"]: Number("1") }).toISOString(),
    );
  });

  it("Test example: invalid input", () => {
    expect(convertAdditiveTimeToDate(exampleStrings[8])).toBe("");
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
    let date = new Date("2023-05-01T00:00:00");
    let timeData = "2 hours";

    // when
    const [updatedDate, isError] = processTimeUnits(date, timeData);

    // then
    expect(updatedDate).toEqual(new Date("2023-05-01T02:00:00"));
    expect(isError).toBe(false);
  });

  it("should return same date and true if the time unit is invalid", () => {
    // given
    let date = new Date("2023-05-01T00:00:00");
    let timeData = "2 elephants";

    // when
    const [updatedDate, isError] = processTimeUnits(date, timeData);

    // then
    expect(updatedDate).toEqual(date); // same date should be returned
    expect(isError).toBe(true);
  });

  // continue defining more tests according to different function usages
});
