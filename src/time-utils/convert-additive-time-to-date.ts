import { add } from "date-fns";
import { convertWordsToNumbers } from "./helpers/convert-words-to-numbers";
import { extractTimePartsAndUnits } from "./helpers/extract-time-parts-and-units";

const TIME_UNITS = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year",
];

export function processTimeUnits(
  date: Date,
  timeData: string,
): [Date, boolean] {
  let [value, timeUnit] = timeData.trim().split(" ");
  if (value == "a" || value === "an") {
    value = "one";
  }
  if (
    !TIME_UNITS.includes(timeUnit) &&
    !TIME_UNITS.includes(timeUnit.slice(0, -1))
  )
    return [date, true];
  if (isNaN(Number(value))) {
    try {
      value = convertWordsToNumbers(value);
    } catch (e) {
      return [date, true];
    }
  }
  if (TIME_UNITS.includes(timeUnit)) timeUnit += "s";
  const options = { [timeUnit]: Number(value) };
  return [add(date, options), false];
}

export function convertAdditiveTimeToDate(timeString: string, fromTime: Date | undefined = undefined): string {
  let invalidInput = false;
  const timeParts = extractTimePartsAndUnits(timeString);
  if (!timeParts) {
    return "";
  }

  const currentTime: Date = fromTime || new Date();
  let date = new Date(currentTime.getTime());
  //@ts-expect-error time part is okay as is
  timeParts.forEach((timePart) => {
    timePart.replaceAll(",", "");
    let newDate: Date;
    // if (
    //   ["tomorrow", "next week", "next month", "next year"].includes(timePart)
    // ) {
    //   newDate = processClearPhrases(date, timePart);
    // } else {
    [newDate, invalidInput] = processTimeUnits(date, timePart);
    // }
    date = newDate;
    if (invalidInput) return;
  });
  if (invalidInput) return "";
  return date.toISOString();
}
