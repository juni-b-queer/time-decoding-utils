import { getNextDateTime } from "./helpers/current-date-string";

export function extractDateTimeString(input: string): string {
  let extractedDateTime = "";
  // RegExp patterns match various possible time formats
  // RegExp patterns match various possible time formats
  let outputDateTime: string | boolean = "";
  outputDateTime = extractDateTime(input);

  //if outputDateTime is not false and not a boolean

  if (typeof outputDateTime !== "boolean") {
    extractedDateTime = outputDateTime;
  } else {
    let outputDate: string | boolean = "";
    let outputTime: string | boolean = "";
    outputDate = extractDate(input);
    outputTime = extractTime(input);

    if (
      outputDate &&
      outputTime &&
      typeof outputDate !== "boolean" &&
      typeof outputTime !== "boolean"
    ) {
      outputDate = replaceSlashWithHyphen(outputDate);
      outputDate = addLeadingZeros(outputDate);
      extractedDateTime = `${outputDate} ${outputTime}`;
    } else if (outputDate && typeof outputDate !== "boolean") {
      outputDate = replaceSlashWithHyphen(outputDate);
      outputDate = addLeadingZeros(outputDate);
      extractedDateTime = `${outputDate}`;
    } else if (outputTime && typeof outputTime !== "boolean") {
      extractedDateTime = `${getNextDateTime(outputTime)}`;
    }
  }

  return extractedDateTime;
}

export function extractDateTime(input: string): string | boolean {
  const dateTimeFormat = /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z?\b/;
  const dateTimeMatch = input.match(dateTimeFormat);
  if (dateTimeMatch) {
    return dateTimeMatch[0].endsWith("Z")
      ? dateTimeMatch[0].slice(0, -1)
      : dateTimeMatch[0];
  }
  return false;
}

export function extractDate(input: string): string | boolean {
  let outputDate = "";
  const dateFormats = [
    /\b\d{4}-\d{1,2}-\d{1,2}\b/g, // Matches "2024-12-24"
    /\b\d{2}-\d{1,2}-\d{1,2}\b/g, // Matches "24-12-24" and "24-1-2"
    /\b\d{1,2}-\d{1,2}-\d{2}\b/g, // Matches 12-12-24 1-12-24 and 12-1-24
    /\b\d{1,2}-\d{1,2}-\d{4}\b/g, // Matches 12-12-24 1-12-24 and 12-1-24
    /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g, // Matches "12/24/2024"
    /\b\d{1,2}\/\d{1,2}\/\d{2}\b/g, // Matches "9/3/24"
  ];
  for (const datePattern of dateFormats) {
    const dateMatch = input.match(datePattern);
    if (dateMatch) {
      outputDate = dateMatch[0];
      break;
    }
  }
  if (outputDate === "") {
    return false;
  }
  return outputDate;
}

export function extractTime(input: string): string | boolean {
  // Define all time formats in an array
  const timeFormats = [
    /(\b\d{1,2}:\d{2}:\d{2}.\d{1,3}\s?(AM|PM)\b)/gi,
    / \b\d{1,2}:\d{2}:\d{2}.\d{1,3}\b /g,
    /\b\d{1,2}:\d{2}:\d{2}.\d{1,3}Z\b/g,
    /(\b\d{1,2}:\d{2}:\d{2}\s?(AM|PM)\b)/gi,
    / \b\d{1,2}:\d{2}:\d{2}\b /g,
    /\b\d{1,2}:\d{2}:\d{2}Z\b/g,
  ];
  input = input.toUpperCase();

  // Try finding time in each format
  for (const timeFormat of timeFormats) {
    const match = input.match(timeFormat);
    if (match) {
      return match[0].replaceAll(" ", "");
    }
  }

  const shortFormats = [
    /(\b\d{1,2}:\d{2}\s?(AM|PM)\b)/gi,
    /(\b\d{1,2}:\d{2}\b)/gi,
  ];
  for (const shortFormat of shortFormats) {
    const match = input.match(shortFormat);
    if (match) {
      let hourNumber: number;
      let minuteNumber: number;
      let matchValue = match[0];

      const timeMatches = matchValue
        .replace(/[a-z]/gi, "")
        .match(/\b\d{1,2}\b/g);
      if (timeMatches) {
        hourNumber = Number(timeMatches[0]);
        minuteNumber = Number(timeMatches[1]);

        let meridiemPart = ["PM", "AM"].includes(
          matchValue.slice(-2).toUpperCase(),
        )
          ? matchValue.slice(-2).toUpperCase()
          : "";

        while (hourNumber > 12) {
          hourNumber = hourNumber - 12;
          meridiemPart = "PM";
        }
        return `${hourNumber.toString().padStart(2, "0")}:${minuteNumber.toString().padStart(2, "0")}${meridiemPart}`;
      }
    }
  }

  // If not found, try matching hours and meridiem
  const match = input.match(/(\b\d{1,2}\s?(AM|PM)\b)/gi);
  if (match) {
    const time = match[0].replaceAll(" ", "");
    const hourPart = time.split(/\D/)[0].padStart(2, "0");
    let meridiemPart = time.slice(-2);

    let hourNumber = Number(hourPart);

    if (hourNumber > 12 && meridiemPart == "AM") {
      while (hourNumber > 12) {
        hourNumber = hourNumber - 12;
      }
      meridiemPart = "PM";
    } else if (hourNumber == 24) {
      hourNumber = 12;
      meridiemPart = "AM";
    } else if (hourNumber > 24) {
      while (hourNumber > 23) {
        hourNumber = hourNumber - 12;
        meridiemPart = meridiemPart === "AM" ? "PM" : "AM";
      }
      if (hourNumber > 12) {
        hourNumber = hourNumber - 12;
      }
    }

    if (hourNumber == 0) {
      hourNumber = 12;
      meridiemPart = "AM";
    }

    return `${hourNumber.toString().padStart(2, "0")}:00${meridiemPart}`;
  }

  // If no matches, return false
  return false;
}
export function addLeadingZeros(date: string): string {
  const splitDate = date.split("-");

  // Check if the date is already in a valid format
  if (splitDate.length === 3) {
    // Year leading: Change 2 digit year to 4 and pad month and day with leading zeros
    if (
      (splitDate[0].length === 2 && parseInt(splitDate[0]) >= 24) ||
      splitDate[0].length === 4
    ) {
      const year =
        splitDate[0].length === 2 ? `20${splitDate[0]}` : splitDate[0];
      const month = splitDate[1].padStart(2, "0");
      const day = splitDate[2].padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    // Year trailing: Change 2 digit year to 4 and pad month and day with leading zeros
    if (
      (splitDate[2].length === 2 && parseInt(splitDate[2]) >= 24) ||
      splitDate[2].length === 4
    ) {
      const month = splitDate[0].padStart(2, "0");
      const day = splitDate[1].padStart(2, "0");
      const year =
        splitDate[2].length === 2 ? `20${splitDate[2]}` : splitDate[2];
      return `${month}-${day}-${year}`;
    }
  }

  throw new Error(`Invalid date format`);
}

export function replaceSlashWithHyphen(input: string): string {
  return input.replace(/\//g, "-");
}
