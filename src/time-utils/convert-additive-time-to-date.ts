import {add, addDays, addWeeks, addMonths, addYears} from "date-fns";
import { convertWordsToNumbers } from "./helpers/convert-words-to-numbers";

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
  if (phrase === "next year") return addYears(date, 1);
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
  if (isNaN(Number(value))) {
    try{
      value = convertWordsToNumbers(value);
    }catch (e) {
      return [date, true]
    }

  }
  if (TIME_UNITS.includes(timeUnit)) timeUnit += "s";
  const options = { [timeUnit]: Number(value) };
  return [add(date, options), false];
}

export function convertAdditiveTimeToDate(timeString: string): string {
  let invalidInput = false;
  // Extract the time specification from the input string
  timeString = timeString.replace(/next week/gi, 'nextweek')
      .replace(/next month/gi, 'nextmonth')
      .replace(/next year/gi, 'nextyear');
  let timeSpecArray: RegExpMatchArray|null|undefined = timeString.match(/(\w+|\d+)\s(year|month|week|day|hour|minute|second|and)s?/gi);
  let nextTimeSpecArray: RegExpMatchArray|null = timeString.match(/(tomorrow|nextweek|nextmonth|nextyear)/gi);

  if(timeSpecArray !== undefined && timeSpecArray !== null){
    if(nextTimeSpecArray !== undefined && nextTimeSpecArray !== null){
      nextTimeSpecArray.forEach((item) =>{
        timeSpecArray?.push(item)
      });
    }
  }else if(nextTimeSpecArray !== undefined && nextTimeSpecArray !== null){
    timeSpecArray = nextTimeSpecArray
  }else{
    //@ts-ignore
    timeSpecArray = []
  }

  //@ts-ignore
  let joinedTimeSpec = timeSpecArray.join(', ');
  let timeSpec = joinedTimeSpec.replace(/nextweek/gi, 'next week')
      .replace(/nextmonth/gi, 'next month')
      .replace(/nextyear/gi, 'next year');



  const currentTime: Date = new Date();
  let timeParts = timeSpec.split(/[\s,]+and\s|,/).map((item) => item.trim());
  if(timeParts.length === 1 && timeParts[0] === ''){
    timeParts = [];
    invalidInput = true;
  }
  let date = new Date(currentTime.getTime());

  timeParts.forEach((timePart) => {
    timePart.replaceAll(",", "")
    let newDate: Date;
    if (["tomorrow", "next week", "next month", "next year"].includes(timePart)) {
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
