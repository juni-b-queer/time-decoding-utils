/**
 * Main Function to be used
 */
export { extractTimeFromInput } from "./time-utils/extract-time-from-input";

/**
 * Functions used in extractTimeFromInput
 */
//Functions for converting time stamps
export {
  extractDateTimeString,
  extractDateTime,
  extractDate,
  extractTime,
  addLeadingZeros,
  replaceSlashWithHyphen,
} from "./time-utils/extract-date-time-string";
//Functions for converting additive time
export {
  convertAdditiveTimeToDate,
  processTimeUnits,
} from "./time-utils/convert-additive-time-to-date";

/**
 * Helper functions used in throughout the package
 */
export { convertWordsToNumbers } from "./time-utils/helpers/convert-words-to-numbers";
export {
  extractTimezone,
  extractTimezoneAbbreviation,
} from "./time-utils/helpers/extract-timezone";
export { convertDateAndTimeToIso } from "./time-utils/helpers/convert-date-and-time-to-iso";
export { extractTimePartsAndUnits } from "./time-utils/helpers/extract-time-parts-and-units";
export {
  getCurrentDateString,
  getNextDateTime,
} from "./time-utils/helpers/current-date-string";
