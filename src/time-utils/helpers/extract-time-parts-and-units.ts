export function extractTimePartsAndUnits(
  timeString: string,
): string[] | boolean {
  let invalidInput = false;
  // Extract the time specification from the input string
  timeString = timeString
    .replace(/tomorrow/gi, "1 day")
    .replace(/next week/gi, "1 week")
    .replace(/next month/gi, "1 month")
    .replace(/next year/gi, "1 year");
  const timeStringWithHalfsReplaced = handleHalf(timeString);
  if (typeof timeStringWithHalfsReplaced !== "boolean") {
    timeString = timeStringWithHalfsReplaced;
  }
  let timeSpecArray: RegExpMatchArray | null | undefined = timeString.match(
    /(\w+|\d+)\s(year|month|week|day|hour|minute|second|and)s?/gi,
  );

  if (timeSpecArray === null) {
    //@ts-expect-error should be empty if none found
    timeSpecArray = [];
  }

  //@ts-expect-error This won't fail, I've already checked them above
  const joinedTimeSpec = timeSpecArray.join(", ");
  const timeSpec = joinedTimeSpec
    .replace(/nextweek/gi, "next week")
    .replace(/nextmonth/gi, "next month")
    .replace(/nextyear/gi, "next year");

  let timeParts = timeSpec.split(/[\s,]+and\s|,/).map((item) => item.trim());
  if (timeParts.length === 1 && timeParts[0] === "") {
    timeParts = [];
    invalidInput = true;
  }
  if (invalidInput) {
    return false;
  }

  return timeParts;
}

const timeUnitsToMinutes: { [key: string]: number } = {
  minute: 1,
  hour: 60,
  day: 24 * 60,
  week: 7 * 24 * 60,
  month: 30 * 24 * 60,
  year: 365 * 24 * 60,
};

function replaceHalf(match: string, p1: string, p2: string) {
  if (p1.startsWith("half")) {
    const value = timeUnitsToMinutes[p2] / 2;
    return `${value} minutes`;
  } else {
    const value = 1.5 * timeUnitsToMinutes[p1];
    return `${value} minutes`;
  }
}

export function handleHalf(timeString: string): string | boolean {
  let pattern = /(half a|half an)\s(year|month|week|day|hour|minute)s?/gi;
  timeString = timeString.replace(pattern, replaceHalf);
  pattern = /(year|month|week|day|hour|minute)\s(and a half)s?/gi;
  timeString = timeString.replace(pattern, replaceHalf);
  timeString = timeString
    .replace(/an (\d+) (\w+)/gi, "$1 $2")
    .replace(/a (\d+) (\w+)/gi, "$1 $2");
  if (timeString === "") {
    return false;
  }
  return timeString;
}
