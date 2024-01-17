# Time Decoding Utilities

A package for extracting a date, or time calculation, from input strings

# Table of contents

- [Overview](#overview)
- [Credits](#credits)

[npm Package](https://www.npmjs.com/package/time-decoding-utils)

# Overview

I needed a better time library to extract various types of time calculations and strings from inputs.
The main function `extractTimeFromInput` is able to accept any input string with either a date and/or time input (ex. "do it on 12/24/24 at 12:30PM") or additive time phrases (ex. "in 3 weeks, 2 days, and 17 hours") and return an ISO timestamp for that date/time.
Optionally, it can also accept a timezone, so if you input "on 12/24/24 at 12PM America/New York" or "on 12/24/24 at 12PM EST", the ISO timestamp will account for the timezone.

There are many other date/time helper functions available too make working with, or extracting dates/times much easier

# Available functions (links to docs)

## Main Function to be used

**[`extractTimeFromInput`](#extracttimefrominput)**

### Functions used in extractTimeFromInput

#### Functions for converting time stamps

**[`extractDateTimeString`](#extractdatetimestring)**\
**[`extractDateTime`](#extractdatetime)**\
**[`extractDate`](#extractdate)**\
**[`extractTime`](#extracttime)**\
**[`addLeadingZeros`](#addleadingzeros)**\
**[`replaceSlashWithHyphen`](#replaceslashwithhyphen)**

#### Functions for converting additive time

**[`convertAdditiveTimeToDate`](#convertadditivetimetodate)**\
**[`processClearPhrases`](#processclearphrases)**\
**[`processTimeUnits`](#processtimeunits)**

### Helper functions used throughout the package

**[`convertWordsToNumbers`](#convertwordstonumbers)**\
**[`extractTimezone`](#extracttimezone)**\
**[`convertDateAndTimeToIso`](#convertdateandtimetoiso)**\
**[`getCurrentDateString`](#getcurrentdatestring)**\
**[`getNextDateTime`](#getnextdatetime)**

# Function descriptions

## extractTimeFromInput

The `extractTimeFromInput` function is an exported function from the `extract-time-from-input.ts` file.

**Usage:**

```typescript
extractTimeFromInput(input: string, timezone: string = DEFAULT_TIMEZONE): string;
```

**Description:**

This function is designed to extract the requested time from a given input and return it as a timestamp string. It allows the user to provide a string input containing time details, and optionally a timezone. It uses other functions within the module like `extractTimezone`, `extractDateTimeString`, `convertDateAndTimeToIso`, and `convertAdditiveTimeToDate`.

The function begins with setting `timezone` to `DEFAULT_TIMEZONE` which is established by the `process.env.DEFAULT_TIMEZONE` or defaulted to `America/Chicago` if none is provided.

When a datetime string is not correctly parsed from the input with `extractDateTimeString`, `convertAdditiveTimeToDate` is used to convert additive time to date.

If no timestamp or additive time is found, the function will return an empty string
**Parameters:**

- `input` _(string)_: The input string containing time information.
- `timezone` _(string)_: The timezone string. If not provided, it uses the `DEFAULT_TIMEZONE`.

**Returns:**

- A string: This is the extracted timestamp in ISO format.

**Exception:**

This function uses a `try-catch` statement to handle any errors that may arise while processing the input string for the timestamp. In the event of an error, the function will attempt to convert additive time to the date.

## Functions in `extract-date-time-string.ts`

**Usage:**

This file contains multiple functions related to manipulating and analyzing input string to extract date and time information in different formats.

### extractDateTimeString

**Usage:**

```typescript
extractDateTimeString(input: string): string;
```

**Description:**

This function extracts datetime from the input string. It uses various helper functions to achieve this which are included in the same script.

**Parameters:**

- `input` _(string)_: The input string containing datetime information.

**Returns:**

- A string: The extracted datetime in string format.

### extractDateTime

**Usage:**

```typescript
extractDateTime(input: string): string | boolean;
```

**Description:**

This function is used to extract datetime from the input string.

**Parameters:**

- `input` _(string)_: The input string from which to extract the datetime.

**Returns:**

- A string or boolean: The extracted datetime in string format if matches were found or **false** otherwise.

### extractDate

**Usage:**

```typescript
extractDate(input: string): string | boolean;
```

**Description:**

This function is used to extract a date from the input string.

**Parameters:**

- `input` _(string)_: The input string from which to extract the date.

**Returns:**

- A string or boolean: The extracted date in string format if matches were found or **false** otherwise.

### extractTime

**Usage:**

```typescript
extractTime(input: string): string | boolean;
```

**Description:**

This function is used to extract time from the input string.

**Parameters:**

- `input` _(string)_: The input string from which to extract the time.

**Returns:**

- A string or boolean: The extracted time in string format if matches were found or **false** otherwise.

### addLeadingZeros

**Usage:**

```typescript
addLeadingZeros(date: string): string;
```

**Description:**

This function is used to add leading zeros to a date string.

**Parameters:**

- `date` _(string)_: The input date string which may need leading zeros added.

**Returns:**

- A string: The date string, which has been reformatted with leading zeros added if necessary.

### replaceSlashWithHyphen

**Usage:**

```typescript
replaceSlashWithHyphen(input: string): string;
```

**Description:**

This function replaces slashes in a string with hyphens.

**Parameters:**

- `input` _(string)_: The input string in which to replace slashes with hyphens.

**Returns:**

- A string: The resulting string, with all slashes replaced with hyphens.

## Functions in `convert-additive-time-to-date.ts` and related helper functions

This file provides functionality for processing phrases related to dates and times, and converting them to an appropriate date format.

### convertAdditiveTimeToDate

**Usage:**

```typescript
convertAdditiveTimeToDate(timeString: string): string;
```

**Description:**

This function converts additive time phrases to a date string in ISO format.

**Parameters:**

- `timeString` (_string_): The string representing the time to add.

**Returns:**

- _string_: The date resulting from adding the time to current date, or an empty string if an invalid input was given.

### processClearPhrases

**Usage:**

```typescript
processClearPhrases(date: Date, phrase: string): Date;
```

**Description:**

This function interprets clear phrases like 'tomorrow', 'next week', 'next month' and modifies the date accordingly.

**Parameters:**

- `date` (_Date_): The starting date.
- `phrase` (_string_): The key phrase.

**Returns:**

- _Date_: The new date after adding the time specified by the phrase.

### processTimeUnits

**Usage:**

```typescript
processTimeUnits(date: Date, timeData: string): [Date, boolean];
```

**Description:**

This function processes phrases with time units and adjusts the date accordingly.

**Parameters:**

- `date` (_Date_): The starting date.
- `timeData` (_string_): The string having time data.

**Returns:**

- _[Date, boolean]_: A tuple with the new date after adding the time specified by `timeData`, and a boolean flag indicating invalid input.

## Function in `convert-words-to-numbers.ts`

This file contains a function which can convert human-readable, textual numbers (words) into actual number representations. This is useful in situations where numeric data is written in words, such as text-based time indications in English.

### convertWordsToNumbers

**Usage:**

```typescript
convertWordsToNumbers(input: string): string;
```

**Description:**

This function converts word-based numerical values into actual numbers. It's capable of handling magnitude-related terms such as 'thousand', 'million', 'billion', etc., in addition to smaller numbers up to 'ninety'. The function can handle mixed usage, i.e., combining magnitudes with smaller numbers ('one hundred', 'twenty million', etc.) It works by splitting the text into individual words and gradually constructing the final numeric value.

**Parameters:**

- `input` (_string_): The input string containing a textual representation of the number.

**Returns:**

- _string_: The number represented by the input text as a string of digits.

**Exceptions:**

If the function encounters an unrecognizable word that isn't a pre-defined number representation, it will throw an Error indicating 'Unknown number: ' followed by the unrecognized word.

## Function in `extract-timezone.ts`

This file contains a function for extracting timezone data from a provided input string. The function makes use of the `moment` library's ability to handle and manipulate timezones.

### extractTimezone

**Usage:**

```typescript
extractTimezone(input: string): boolean | string;
```

**Description:**

This function identifies and extracts the timezone information from a given string. It uses the Moment.js library to match portions of the input string with known timezone names recognized by Moment.js. If multiple matches are found, it will return the longest matching timezone name.

**Parameters:**

- `input` (_string_): The input string from which to extract the timezone.

**Returns:**

- _boolean|string_: Returns the extracted timezone name as a string if a timezone was found in the input. If no timezone is found, the function will return `false`.

This function is a useful utility for parsing and working with timezone data in user-inputted text.

## Function in `convert-date-and-time-to-iso.ts`

This file contains a function to convert a date and time, provided as a string in various potential formats, to an ISO-8601 formatted string using `moment` and `moment-timezone` functions.

### convertDateAndTimeToIso

**Usage:**

```typescript
convertDateAndTimeToIso(input: string, timezone: string = "America/Chicago"): string;
```

**Description:**

This function normalizes date strings and convert them to ISO-8601 format. It's highly adaptable and accepts several formats and conventions. The function strives to provide easy time-zone compatibility and is capable of interpreting and adjusting the date-time according to the provided time-zone.

**Parameters:**

- `input` (_string_): the input string which is to be converted to date-time.
- `timezone` (_string_): the timezone in which the date-time is to be interpreted. If not specified, timezone defaults to `America/Chicago`.

**Returns:**

- _string_: This will be the date-time represented in the ISO-8601 standard format.

**Exceptions:**

If unable to successfully parse and convert the input string to a valid date-time, the function throws a JavaScript Error with the message "Invalid date: {input}", where "{input}" is a placeholder for the provided input string.

## Functions in `current-date-string.ts`

This file contains two functions that are responsible for generating current date string and calculating next datetime string. They provide functionality to generate timestamps and manipulate them.

### getCurrentDateString

**Usage:**

```typescript
getCurrentDateString(): string;
```

**Description:**

This function provides the current date as a string in the format "YYYY-MM-DD". It's a simple utility for getting the standardized string representation of the current date.

**Returns:**

- _string_: The current date as a string in the format "YYYY-MM-DD".

### getNextDateTime

**Usage:**

```typescript
getNextDateTime(inputTimeString: string = ""): string;
```

**Description:**

This function calculates the next date-time string based on the current time and a provided input time. If the input time is before the current time, the function considers the input time as the time of the next day.

**Parameters:**

- `inputTimeString` (_string_): The time of day in format "hh:mma" as a string. If no string is provided, it defaults to the current time plus one minute.

**Returns:**

- _string_: The next date-time as a string in the format "YYYY-MM-DD hh:mma". If no input is provided, it will return the current date-time string.

# Credits

This README was almost entirely written by Jetbrains AI. Most of the tests were also written by AI because it was much easier to write good tests that way

## Packages used
