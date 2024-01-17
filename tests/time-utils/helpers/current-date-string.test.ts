import moment from "moment";
import {getCurrentDateString, getNextDateTime} from "../../../src";
import {advanceTo, clear} from "jest-date-mock";

describe("getCurrentDateString tests", () => {
  afterEach(() => {
    clear(); // Clear the mock after each test
  });

  it("should return the current date in the format YYYY-MM-DD", () => {
    const currentDate = getCurrentDateString();

    // check if output matches YYYY-MM-DD format
    expect(moment(currentDate, "YYYY-MM-DD", true).isValid()).toBeTruthy();
  });

  it("should return today's date", () => {
    const currentDate = getCurrentDateString();
    const todayDate = moment().format("YYYY-MM-DD");

    expect(currentDate).toEqual(todayDate);
  });

  it("should prepend 0 when the day is single digit", () => {
    advanceTo(new Date("2024-01-09T12:00:00")); // Set the mock date to a single digit day
    const currentDate = getCurrentDateString();
    const expectedDate = moment().format("YYYY-MM-DD");
    expect(currentDate).toEqual(expectedDate);
  });

  it("should not prepend 0 when the day is not single digit", () => {
    advanceTo(new Date("2024-01-12T12:00:00")); // Set the mock date to not single digit day
    const currentDate = getCurrentDateString();
    const expectedDate = moment().format("YYYY-MM-DD");
    expect(currentDate).toEqual(expectedDate);
  });

  it("should prepend 0 when the month is single digit", () => {
    advanceTo(new Date("2024-02-01T12:00:00")); // Set the mock date to a single digit month
    const currentDate = getCurrentDateString();
    const expectedDate = moment().format("YYYY-MM-DD");
    expect(currentDate).toEqual(expectedDate);
  });

  it("should not prepend 0 when the month is not single digit", () => {
    advanceTo(new Date("2024-11-01T12:00:00")); // Set the mock date to not single digit month
    const currentDate = getCurrentDateString();
    const expectedDate = moment().format("YYYY-MM-DD");
    expect(currentDate).toEqual(expectedDate);
  });
});

describe("Testing getNextDateTime function", () => {
  beforeAll(() => {
    advanceTo(new Date("2024-01-16T12:00:00")); // Mock the date
  });

  afterAll(() => {
    clear(); // Clear the mock
  });

  test("when input time is after the current time", () => {
    const input = "01:00PM";
    const output = getNextDateTime(input);
    // expected output is "2024-01-16" as date and "01:00PM" as time
    expect(output).toEqual("2024-01-16 01:00PM");
  });

  test("when input time is before the current time", () => {
    const input = "11:00AM";
    const output = getNextDateTime(input);
    // expected output is one day after ("2024-01-17") as date and "11:00AM" as time
    expect(output).toEqual("2024-01-17 11:00AM");
  });

  test("when input time is equal to the current time", () => {
    const input = "12:00PM";
    const output = getNextDateTime(input);
    // expected output is one day after ("2024-01-17") as date and "12:00PM" as time
    expect(output).toEqual("2024-01-17 12:00PM");
  });

  test("when input time is empty, get current date time", () => {
    const input = "";
    const output = getNextDateTime(input);
    expect(output).toEqual("2024-01-16 12:00PM");
  });

  test("when no input time is empt, get current date time", () => {
    const output = getNextDateTime();
    expect(output).toEqual("2024-01-16 12:00PM");
  });
});
