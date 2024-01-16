import moment from 'moment';
import moment_timezone from 'moment-timezone';
import {extractTime} from "./extract-date-time-string";

// export function convertDateAndTimeToIso(input: string): string {
//     //if input is already in iso format, return
//     if (moment(input, moment.ISO_8601, true).isValid()) {
//         if(input.endsWith('.000Z')){
//             return input;
//         }else{
//             return input + '.000Z'
//         }
//
//     }
//
//     input = input.toUpperCase();  // Convert input to uppercase
//     const formats = ["MM-DD-YYYY ha", "MM-DD-YYYY hha", "MM-DD-YYYY hh:mma", "YYYY-MM-DD ha", "YYYY-MM-DD hha", "YYYY-MM-DD hh:mma", "YYYY-MM-DDTHH:mm:ss", "MM-DD-YYYY", "YYYY-MM-DD"];
//     let datetime;
//
//     // Here's the change... we parse the input using moment.tz to specify timezone as "America/Chicago" which represents Central Time
//     for (let format of formats) {
//         datetime = moment_timezone.tz(input, format, 'America/Chicago');
//         if (datetime.isValid()) break;
//     }
//
//     if (!datetime?.isValid()) {
//         throw new Error(`Invalid date: ${input}`);
//     }
//
//     if (!input.includes('AM') && !input.includes('PM') && !input.includes('T')) {
//         datetime.set({ hour: 12, minute: 0, second: 0 });
//     }
//
//     // Convert date from Central Time (CT) to Coordinated Universal Time (UTC)
//     datetime = datetime.utc();
//
//     // Output date in ISO format, now in UTC/GMT time
//     return datetime.toISOString();
// }

export function convertDateAndTimeToIso(input: string, timezone: string = "America/Chicago"): string {
    // if input is already in iso format, convert the input to a datetime then return the full iso string
    if (moment(input, "YYYY-MM-DDTHH:mm:ss", true).isValid()) {
        let existingDatetime = moment_timezone.tz(input, moment.ISO_8601, "utc");
        return existingDatetime.toISOString()
    }



    input = input.toUpperCase();  // Convert input to uppercase
    // const formats = ["MM-DD-YYYY ha", "MM-DD-YYYY ha A", "MM-DD-YYYY hh:mma", "YYYY-MM-DD ha", "YYYY-MM-DD ha A", "YYYY-MM-DD hh:mma", "YYYY-MM-DDTHH:mm:ss", "MM-DD-YYYY", "YYYY-MM-DD"];
    const formats = [
        "MM-DD-YYYY ha",
        "MM-DD-YYYY h:mma",
        "YYYY-MM-DD ha",
        "YYYY-MM-DD h:mma",
        "YYYY-MM-DDTHH:mm:ss",
        "MM-DD-YYYY",
        "YYYY-MM-DD"
    ];
    let datetime;

    // Here's the change... we parse the input using moment.tz to specify timezone as UTC
    for (let format of formats) {
        datetime = moment_timezone.tz(input, format, timezone);
        if (datetime.isValid()) break;
    }

    if (!datetime?.isValid()) {
        throw new Error(`Invalid date: ${input}`);
    }

    if (!input.includes('AM') && !input.includes('PM') && !input.includes('T')) {
        datetime.set({ hour: 12, minute: 0, second: 0 });
    }

    if (input.includes('AM') || input.includes('PM')) {
        //if the input also includes a colon, for example "12-02-2024 10:15AM"
        let timeString = extractTime(input);
        if(typeof timeString !== 'boolean'){
            let minuteString: string = '00';
            let minuteNumber: number = 0;

            if(timeString.includes(':')){
                minuteString = timeString.split(':')[1].replace(/\D/g, '');
            }
            minuteNumber = parseInt(minuteString);

            datetime.set({  minute: minuteNumber });
        }
    }


    // Convert date from UTC to ISO format
    return datetime.toISOString();
}