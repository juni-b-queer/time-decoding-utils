import {convertAdditiveTimeToDate, extractTime, extractTimeFromInput} from "../../src";
import { advanceTo, clear } from "jest-date-mock";
import {add} from "date-fns";
import moment from "moment/moment";

describe("extractTimeFromInput Test Suite", () => {
  beforeAll(() => {
    advanceTo(new Date("2024-01-16T12:00:00")); // Mock the date
  });

  afterAll(() => {
    clear(); // Clear the mock
  });

  it('should return date for "1 day" input', () => {
    const input = "1 day";
    const expected = "2024-01-17T18:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "1 hour" input', () => {
    const input = "1 hour";
    const expected = "2024-01-16T19:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "1 year, three days" input', () => {
    const input = "1 year, three days";
    const expected = "2025-01-19T18:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "two days, three minutes" input', () => {
    const input = "two days, three minutes";
    const expected = "2024-01-18T18:03:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "12/24/2025" input', () => {
    const input = "12/24/2025";
    const expected = "2025-12-24T18:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "12/24/2025 at 2PM" input', () => {
    const input = "12/24/2025 at 2PM";
    const expected = "2025-12-24T20:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "07/24/2025 at 2PM" input', () => {
    const input = "07/24/2025 at 2PM";
    const expected = "2025-07-24T19:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "12/24/2025 2PM" input', () => {
    const input = "12/24/2025 2PM";
    const expected = "2025-12-24T20:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "2025-12-24 2PM" input', () => {
    const input = "2025-12-24 2PM";
    const expected = "2025-12-24T20:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "2025-12-24T14:00:00" input', () => {
    const input = "2025-12-24T14:00:00";
    const expected = "2025-12-24T14:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "12-2-24" input', () => {
    const input = "12-2-24";
    const expected = "2024-12-02T18:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "12-2-24 4PM" input', () => {
    const input = "12-2-24 4PM";
    const expected = "2024-12-02T22:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "9-2-24 4PM" input', () => {
    const input = "9-2-24 4PM";
    const expected = "2024-09-02T21:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "1 months, 1 day" input', () => {
    const input = "1 months, 1 day";
    const expected = "2024-02-17T18:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "2 months, 1 day" input', () => {
    const input = "2 months, 1 day";
    const expected = "2024-03-17T17:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "3 months, 1 day" input', () => {
    const input = "3 months, 1 day";
    const expected = "2024-04-17T17:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "4 months, 1 day" input', () => {
    const input = "4 months, 1 day";
    const expected = "2024-05-17T17:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "5 months, 1 day" input', () => {
    const input = "5 months, 1 day";
    const expected = "2024-06-17T17:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "6 months, 1 day" input', () => {
    const input = "6 months, 1 day";
    const expected = "2024-07-17T17:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "7 months, 1 day" input', () => {
    const input = "7 months, 1 day";
    const expected = "2024-08-17T17:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "8 months, 1 day" input', () => {
    const input = "8 months, 1 day";
    const expected = "2024-09-17T17:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "9 months, 1 day" input', () => {
    const input = "9 months, 1 day";
    const expected = "2024-10-17T17:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "10 months, 1 day" input', () => {
    const input = "10 months, 1 day";
    const expected = "2024-11-17T18:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "11 months, 1 day" input', () => {
    const input = "11 months, 1 day";
    const expected = "2024-12-17T18:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "11 months, 1 day" input', () => {
    const input = "12 months, 1 day";
    const expected = "2025-01-17T18:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "12-2-24 4PM" input for new york', () => {
    const input = "12-2-24 4PM America/New York";
    const expected = "2024-12-02T21:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "12-2-24 4PM" input for new_york', () => {
    const input = "12-2-24 4PM America/New_York";
    const expected = "2024-12-02T21:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "12-2-24 4PM" input for CST', () => {
    const input = "12-2-24 4PM CST";
    const expected = "2024-12-02T22:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it('should return date for "12-2-24 4PM" input for PST', () => {
    const input = "12-2-24 4PM PST";
    const expected = "2024-12-03T00:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it("should extract valid Time string from 12:30:00Z in UTC when time ends in Z", () => {
    const input = "The time is 12:30:00Z in HH:mm:ssZ format";
    const expected = "2024-01-16T12:30:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it("should extract valid Time string from 20:15:00.000Z in UTC when time ends in Z", () => {
    const input = "The time is 20:15:00.000Z in HH:mm:ssZ format";
    const expected = "2024-01-16T20:15:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it("should extract valid Time string from 20:15:00.000Z in UTC when time ends in Z", () => {
    const input = "to do a thing on 12/24/2025 at 12PM America/New York";
    const expected = "2025-12-24T17:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it("Test example: tomorrow at 9pm", () => {
    const input = "I will meet you tomorrow at 9pm"
    const expected = "2024-01-18T03:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it("Test example: tomorrow at 9am", () => {
    const input = "I will meet you tomorrow at 9am"
    const expected = "2024-01-17T15:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it("Test example: tomorrow at 9am PST", () => {
    const input = "I will meet you tomorrow at 9am PST"
    const expected = "2024-01-17T17:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it("Test example: tomorrow at 9am EST", () => {
    const input = "I will meet you tomorrow at 9am EST"
    const expected = "2024-01-17T14:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it("Test example: next week at 9pm", () => {
    const input = "I will meet you next week at 9pm"
    const expected = "2024-01-24T03:00:00.000Z";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

  it("Test example: bad input", () => {
    const input = "I will meet you"
    const expected = "";
    expect(extractTimeFromInput(input)).toEqual(expected);
  });

});
