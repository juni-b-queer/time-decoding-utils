import { extractDateTimeString, extractTime } from "./extract-date-time-string";
import { convertDateAndTimeToIso } from "./helpers/convert-date-and-time-to-iso";
import { convertAdditiveTimeToDate } from "./convert-additive-time-to-date";
import { extractTimezone } from "./helpers/extract-timezone";
import moment from "moment";

const DEFAULT_TIMEZONE = process.env.DEFAULT_TIMEZONE ?? "America/Chicago";

export function extractTimeFromInput(
  input: string,
  timezone: string = DEFAULT_TIMEZONE,
): string {
  const extractedTimezone = extractTimezone(input);
  if (typeof extractedTimezone !== "boolean") {
    timezone = extractedTimezone;
  }

  let extractedTimestamp = "";
  extractedTimestamp = convertAdditiveTimeToDate(input);
  if (extractedTimestamp !== "") {
    let match = extractTime(input.toUpperCase());
    if (typeof match !== "boolean") {
      let hourOffset = match.includes("PM") ? 12 : 0;
      let timeParts = match
        .replaceAll("AM", "")
        .replaceAll("PM", "")
        .split(":");
      const [hour, minute] = timeParts.map(Number);
      extractedTimestamp = moment(extractedTimestamp)
        .tz(timezone)
        .set({ hour: hour + hourOffset, minute: minute })
        .toISOString();
    }
  }

  if (extractedTimestamp === "") {
    try {
      extractedTimestamp = convertDateAndTimeToIso(
        extractDateTimeString(input),
        timezone,
      );
    } catch (error) {
      extractedTimestamp = "";
    }
  }

  return extractedTimestamp;
}
