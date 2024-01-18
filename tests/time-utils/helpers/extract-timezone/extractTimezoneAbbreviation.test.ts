import {extractTimezoneAbbreviation} from "../../../../src";

describe("extractTimezoneAbbreviation function", () => {
    test("it should return correct timezone abbreviation", () => {
        const input = "The current time in EST is 10:00am";
        const output = extractTimezoneAbbreviation(input);
        expect(output).toEqual("EST");
    });

    test("it should return false when there is no timezone abbreviation", () => {
        const input = "The current time is 10:00am";
        const output = extractTimezoneAbbreviation(input);
        expect(output).toEqual(false);
    });

    test("it should return the longest timezone abbreviation when multiple abbreviations are present", () => {
        const input = "The current time in EST and PDT is 10:00am";
        const output = extractTimezoneAbbreviation(input);
        expect(output).toEqual("PDT");
    });

    test("it should return the longest timezone abbreviation when multiple abbreviations are present", () => {
        const input = "The current time in ET and EDT is 10:00am";
        const output = extractTimezoneAbbreviation(input);
        expect(output).toEqual("EDT");
    });
});
