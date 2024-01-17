import * as moment from "moment-timezone";
import { extractTimeFromInput, extractTimezone } from "../../../src";

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

  it(`should return PST`, () => {
    const inputText = `12-2-24 4PM CST`;
    expect(extractTimezone(inputText)).toEqual("America/Bahia_Banderas");
  });

  it('should return date for "12-2-24 4PM" input for PST', () => {
    const inputText = "12-2-24 4PM PST";
    expect(extractTimezone(inputText)).toEqual("America/Ensenada");
  });
});
