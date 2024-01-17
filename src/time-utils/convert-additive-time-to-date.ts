import { add, addDays, addWeeks, addMonths } from "date-fns";
import { convertWordsToNumbers } from "./convert-words-to-numbers";

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

export function processClearPhrases(date: Date, phrase: string): Date {
  if (phrase === "tomorrow") return addDays(date, 1);
  if (phrase === "next week") return addWeeks(date, 1);
  if (phrase === "next month") return addMonths(date, 1);
  return date;
}

export function processTimeUnits(
  date: Date,
  timeData: string,
): [Date, boolean] {
  let [value, timeUnit] = timeData.trim().split(" ");
  if (
    !TIME_UNITS.includes(timeUnit) &&
    !TIME_UNITS.includes(timeUnit.slice(0, -1))
  )
    return [date, true];
  if (isNaN(Number(value))) value = convertWordsToNumbers(value);
  if (TIME_UNITS.includes(timeUnit)) timeUnit += "s";
  let options = { [timeUnit]: Number(value) };
  return [add(date, options), false];
}

export function convertAdditiveTimeToDate(timeString: string): string {
  let currentTime: Date = new Date();
  let timeParts = timeString.split(/[\s,]+and\s|,/).map((item) => item.trim());
  let date = new Date(currentTime.getTime());
  let invalidInput = false;
  timeParts.forEach((timePart) => {
    let newDate: Date;
    if (["tomorrow", "next week", "next month"].includes(timePart)) {
      newDate = processClearPhrases(date, timePart);
    } else {
      [newDate, invalidInput] = processTimeUnits(date, timePart);
    }
    date = newDate;
    if (invalidInput) return;
  });
  if (invalidInput) return "";
  return date.toISOString();
}
