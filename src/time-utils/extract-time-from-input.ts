import { extractDateTimeString } from "./extract-date-time-string";
import { convertDateAndTimeToIso } from "./convert-date-and-time-to-iso";
import { convertAdditiveTimeToDate } from "./convert-additive-time-to-date";
import { extractTimezone } from "./extract-timezone";

const DEFAULT_TIMEZONE = process.env.DEFAULT_TIMEZONE ?? "America/Chicago";

export function extractTimeFromInput(
  input: string,
  timezone: string = DEFAULT_TIMEZONE,
): string {
  //TODO Extract timezone
  let extractedTimezone = extractTimezone(input);
  if (typeof extractedTimezone !== "boolean") {
    timezone = extractedTimezone;
  }

  let extractedTimestamp = "";
  //if timestamp
  // extract timestamp

  try {
    extractedTimestamp = convertDateAndTimeToIso(
      extractDateTimeString(input),
      timezone,
    );
  } catch (error) {
    extractedTimestamp = convertAdditiveTimeToDate(input);
  }

  // Determine time type

  // if additive
  // extract additive

  return extractedTimestamp;
}
