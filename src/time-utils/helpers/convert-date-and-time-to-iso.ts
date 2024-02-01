import moment from "moment";
import moment_timezone from "moment-timezone";
import {
  addLeadingZeros,
  extractDate,
  extractTime,
} from "../extract-date-time-string";
import { getNextDateTime } from "./current-date-string";

export function convertDateAndTimeToIso(
  input: string,
  timezone: string = "America/Chicago",
): string {
  // if input is already in iso format, convert the input to a datetime then return the full iso string
  if (moment(input, "YYYY-MM-DDTHH:mm:ss", true).isValid()) {
    const existingDatetime = moment_timezone.tz(input, moment.ISO_8601, "utc");
    return existingDatetime.toISOString();
  }

  input = input.toUpperCase(); // Convert input to uppercase

  const nowDateTime = moment();

  let timeString: string | boolean = extractTime(input);
  if (typeof timeString === "boolean") {
    timeString = "";
  }

  const dateString: string | boolean = extractDate(input);
  if (typeof dateString === "boolean" && timeString !== "") {
    //use nowDateTime and set dateString to the current date in the format YYYY-MM-DD
    input = addLeadingZeros(getNextDateTime(timeString));
  }

  const formats = [
    "MM-DD-YYYY ha",
    "MM-DD-YYYY h:mma",
    "YYYY-MM-DD ha",
    "YYYY-MM-DD h:mma",
    "YYYY-MM-DDTHH:mm:ss",
    "YYYY-MM-DD HH:mm:ss",
    "MM-DD-YYYY",
    "YYYY-MM-DD",
  ];
  let datetime;

  // Here's the change... we parse the input using moment.tz to specify timezone as UTC
  for (const format of formats) {
    if (timeString.endsWith("Z")) {
      timezone = "Etc/UTC";
    }

    datetime = moment_timezone.tz(input, format, timezone);

    if (datetime.isValid()) {
      // if initialized datetime is in the past
      if (datetime.isBefore(nowDateTime)) {
        const currentDateTime = moment();
        datetime.set({
          year: currentDateTime.year(),
          month: currentDateTime.month(),
          date: currentDateTime.date(),
        });
      }
      break;
    }
  }

  if (!datetime?.isValid()) {
    throw new Error(`Invalid date: ${input}`);
  }

  if (
    !input.includes("AM") &&
    !input.includes("PM") &&
    !input.includes("T") &&
    !timeString.includes(":")
  ) {
    datetime.set({ hour: 12, minute: 0, second: 0 });
  }

  if (
    input.includes("AM") ||
    input.includes("PM") ||
    timeString.includes(":")
  ) {
    //if the input also includes a colon, for example "12-02-2024 10:15AM"
    let minuteString: string = "00";
    let minuteNumber: number = 0;

    if (timeString.includes(":")) {
      minuteString = timeString.split(":")[1].replace(/\D/g, "");
    }
    minuteNumber = parseInt(minuteString);

    datetime.set({ minute: minuteNumber });
  }

  // Convert date from UTC to ISO format
  return datetime.toISOString();
}
