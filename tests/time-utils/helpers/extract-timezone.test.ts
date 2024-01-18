import * as moment from "moment-timezone";
import { extractTimezone, extractTimezoneAbbreviation } from "../../../src";

describe("extractTimezone function", () => {
  const timezoneNames = moment.tz.names();
  timezoneNames.forEach((timezoneName) => {
    it(`should correctly identify timezone ${timezoneName}`, () => {
      const inputText = `Hello this is an example with the timezone ${timezoneName} and it's being tests`;
      expect(extractTimezone(inputText)).toEqual(timezoneName);
    });
  });

  it(`should return null for invalid timezone`, () => {
    const inputText = `Hello this is an example with an invalid timezone`;
    expect(extractTimezone(inputText)).toBeFalsy();
  });

  it(`should return cst`, () => {
    const inputText = `12-2-24 4PM CST`;
    expect(extractTimezone(inputText)).toEqual("America/Bahia_Banderas");
  });

  it(`should return cst`, () => {
    const inputText = `12-2-24 4PM cst`;
    expect(extractTimezone(inputText)).toEqual("America/Bahia_Banderas");
  });

  it('should return date for "12-2-24 4PM" input for PST', () => {
    const inputText = "12-2-24 4PM PST";
    expect(extractTimezone(inputText)).toEqual("America/Ensenada");
  });

  it('should return date for "12-2-24 4PM" input for EDT', () => {
    const inputText = "12-2-24 4PM EST";
    expect(extractTimezone(inputText)).toEqual("EST");
  });
});

describe("extractTimezoneAbbreviation function", () => {
  test("it should return correct timezone abbreviation", () => {
    const input = "The current time in EST is 10:00am";
    const output = extractTimezoneAbbreviation(input);
    expect(output).toEqual("EST");
  });

  test("it should return false when there is no timezone abbreviation", () => {
    const input = "The current time is 10:00am";
    const output = extractTimezoneAbbreviation(input);
    expect(output).toEqual(false);
  });

  test("it should return the longest timezone abbreviation when multiple abbreviations are present", () => {
    const input = "The current time in EST and PDT is 10:00am";
    const output = extractTimezoneAbbreviation(input);
    expect(output).toEqual("PDT");
  });

  test("it should return the longest timezone abbreviation when multiple abbreviations are present", () => {
    const input = "The current time in ET and EDT is 10:00am";
    const output = extractTimezoneAbbreviation(input);
    expect(output).toEqual("EDT");
  });
});
