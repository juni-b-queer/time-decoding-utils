import {extractDateTimeString} from "./extract-date-time-string";
import {convertDateAndTimeToIso} from "./convert-date-and-time-to-iso";
import {convertWordsToNumbers} from "./convert-words-to-numbers";
import {convertAdditiveTimeToDate} from "./convert-additive-time-to-date";

export function extractTimeFromInput(input: string): string {
    let extractedTimestamp = ""
    //if timestamp
    // extract timestamp


    try{
        extractedTimestamp = convertDateAndTimeToIso(extractDateTimeString(input))

    }catch(error){
        extractedTimestamp = convertAdditiveTimeToDate(input)
    }

    // Determine time type

    // if additive
    // extract additive

    return extractedTimestamp;
}