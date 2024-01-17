import * as moment from "moment-timezone";

export function extractTimezone(input: string): boolean | string {
  let foundTimezones = moment.tz
    .names()
    .filter(
      (timezone) =>
        input.includes(timezone) ||
        input.includes(timezone.replaceAll("_", " ")),
    );
  //if none found, return false
  if (foundTimezones.length === 0) return false;
  //return longest string in foundTimezones
  return foundTimezones.reduce((a, b) => (a.length > b.length ? a : b));
}
