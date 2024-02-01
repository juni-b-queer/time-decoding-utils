import {extractTimePartsAndUnits} from "../../../src";
import {handleHalf} from "../../../src/time-utils/helpers/extract-time-parts-and-units";
describe("extractTimePartsAndUnits tests", () => {
  const runTest = (input: string, expected: string[]|boolean) => {
    expect(extractTimePartsAndUnits(input)).toEqual(expected);
  };

  it("Input: 1 day", () => {
    const input = "1 day";
    const expected = ["1 day"];
    runTest(input, expected);
  });

  it("Input: 1 day 5 years 9 hours 3 minutes", () => {
    const input = "1 day 5 years 9 hours 3 minutes";
    const expected = [
      "1 day",
      "5 years",
      "9 hours",
      "3 minutes"
    ];
    runTest(input, expected);
  });
  it("Input: 2 days, 6 months and 4 hours", () => {
    const input = "2 days, 6 months and 4 hours";
    const expected = [
      "2 days",
      "6 months",
      "4 hours",
    ];
    runTest(input, expected);
  });

  it("Input: tomorrow", () => {
    const input = "tomorrow";
    const expected = ["1 day"];
    runTest(input, expected);
  });

  it("Input: next year 10 seconds", () => {
    const input = "next year 10 seconds";
    const expected = [
      "1 year",
      "10 seconds",
    ];
    runTest(input, expected);
  });

  it("Input: an hour and a half", () => {
    const input = "an hour and a half";
    const expected = [
      "90 minutes",
    ];
    runTest(input, expected);
  });

  it("Input: half an hour", () => {
    const input = "half an hour";
    const expected = [
      "30 minutes",
    ];
    runTest(input, expected);
  });

  it("Input: half a day", () => {
    const input = "half a day";
    const expected = [
      "720 minutes",
    ];
    runTest(input, expected);
  });

  it("Input: 2 years and half a day", () => {
    const input = "2 years and half a day";
    const expected = [
        "2 years",
      "720 minutes",
    ];
    runTest(input, expected);
  });

  it("Input: a week and a half", () => {
    const input = "a week and a half";
    const expected = [
      "15120 minutes"
    ];
    runTest(input, expected);
  });

  it("Input: next month", () => {
    const input = "next month";
    const expected = ["1 month"];
    runTest(input, expected);
  });

  it("Input: empty string", () => {
    const input = "";
    const expected = false;
    runTest(input, expected);
  });

  it("Input: invalid string", () => {
    const input = "invalid string";
    const expected = false;
    runTest(input, expected);
  });
});
describe("handleHalf tests", () => {
  const runTest = (input: string, expected: string|boolean) => {
    expect(handleHalf(input)).toEqual(expected);
  };

  it("Input: an hour and a half", () => {
    const input = "an hour and a half";
    const expected = "90 minutes";
    runTest(input, expected);
  });

  it("Input: half an hour", () => {
    const input = "half an hour";
    const expected = "30 minutes";
    runTest(input, expected);
  });

  it("Input: half a day", () => {
    const input = "half a day";
    const expected = "720 minutes"
    runTest(input, expected);
  });

  it("Input: a week and a half", () => {
    const input = "a week and a half";
    const expected = "15120 minutes";

    runTest(input, expected);
  });


  it("Input: empty string", () => {
    const input = "";
    const expected = false;
    runTest(input, expected);
  });

  it("Input: invalid string", () => {
    const input = "invalid string";
    const expected = "invalid string";
    runTest(input, expected);
  });
});