import * as moment from "moment-timezone";
import { extractTimezone } from "../../src";

describe("extractTimezone function", () => {
  const timezoneNames = moment.tz.names();
  timezoneNames.forEach((timezoneName) => {
    it(`should correctly identify timezone ${timezoneName}`, () => {
      let inputText = `Hello this is an example with the timezone ${timezoneName} and it's being tests`;
      expect(extractTimezone(inputText)).toEqual(timezoneName);
    });
  });

  it(`should return null for invalid timezone`, () => {
    let inputText = `Hello this is an example with an invalid timezone`;
    expect(extractTimezone(inputText)).toBeFalsy();
  });

  it(`should return PST`, () => {
    let inputText = `12-2-24 4PM CST`;
    expect(extractTimezone(inputText)).toEqual("CST");
  });
});
