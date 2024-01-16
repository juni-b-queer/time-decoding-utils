import {add, addDays, addMonths, addWeeks} from "date-fns";
import {convertAdditiveTimeToDate, processClearPhrases, processTimeUnits} from "../../src";


describe("convertAdditiveTimeToDate Correctly generates the right date", () => {

    let currentTime = new Date();
    let exampleStrings = ["2 days", "3 hours", "1 year", "three hours and 20 minutes", "1 month, 2 weeks, five days and 20 minutes", "tomorrow", "next week", "next month", "invalid input"]

    test("Test example: 2 days", () => {
        expect(convertAdditiveTimeToDate(exampleStrings[0], currentTime)).toBe(add(currentTime, {['days']: Number('2')}).toISOString());
    });

    test("Test example: 3 hours", () => {
        expect(convertAdditiveTimeToDate(exampleStrings[1], currentTime)).toBe(add(currentTime, {['hours']: Number('3')}).toISOString());
    });

    test("Test example: 1 year", () => {
        expect(convertAdditiveTimeToDate(exampleStrings[2], currentTime)).toBe(add(currentTime, {['years']: Number('1')}).toISOString());
    });

    test("Test example: three hours and 20 minutes", () => {
        expect(convertAdditiveTimeToDate(exampleStrings[3], currentTime)).toBe(add(currentTime, {['hours']: Number('3'), ['minutes']: Number('20')}).toISOString());
    });

    test("Test example: 1 month, 2 weeks, five days and 20 minutes", () => {
        expect(convertAdditiveTimeToDate(exampleStrings[4], currentTime))
            .toBe(add(currentTime, {['months']: Number('1'), ['weeks']: Number('2'), ['days']: Number('5'), ['minutes']: Number('20')}).toISOString());
    });

    test("Test example: tomorrow", () => {
        expect(convertAdditiveTimeToDate(exampleStrings[5], currentTime)).toBe(add(currentTime, {['days']: Number('1')}).toISOString());
    });

    test("Test example: next week", () => {
        expect(convertAdditiveTimeToDate(exampleStrings[6], currentTime)).toBe(add(currentTime, {['weeks']: Number('1')}).toISOString());
    });

    test("Test example: next month", () => {
        expect(convertAdditiveTimeToDate(exampleStrings[7], currentTime)).toBe(add(currentTime, {['months']: Number('1')}).toISOString());
    });

    test("Test example: invalid input", () => {
        expect(convertAdditiveTimeToDate(exampleStrings[8], currentTime)).toBe('');
    });
});

describe("processClearPhrases tests", () => {

    test("should add 1 day for 'tomorrow'", () => {
        const currentTime = new Date();
        const expectedResult = addDays(currentTime, 1);
        const result = processClearPhrases(currentTime, "tomorrow");
        expect(result).toEqual(expectedResult);
    });

    test("should add 1 week for 'next week'", () => {
        const currentTime = new Date();
        const expectedResult = addWeeks(currentTime, 1);
        const result = processClearPhrases(currentTime, "next week");
        expect(result).toEqual(expectedResult);
    });

    test("should add 1 month for 'next month'", () => {
        const currentTime = new Date();
        const expectedResult = addMonths(currentTime, 1);
        const result = processClearPhrases(currentTime, "next month");
        expect(result).toEqual(expectedResult);
    });

    test("should return the same date for unknown input", () => {
        const currentTime = new Date();
        const result = processClearPhrases(currentTime, "yesterday");
        expect(result).toEqual(currentTime);
    });

});

describe('Testing processTimeUnits function from time-decoding-utils module', () => {

    test('should process valid time units correctly', () => {
        // given
        let date = new Date('2023-05-01T00:00:00');
        let timeData = '2 hours';

        // when
        const [updatedDate, isError] = processTimeUnits(date, timeData);

        // then
        expect(updatedDate).toEqual(new Date('2023-05-01T02:00:00'));
        expect(isError).toBe(false);
    });

    test('should return same date and true if the time unit is invalid', () => {
        // given
        let date = new Date('2023-05-01T00:00:00');
        let timeData = '2 elephants';

        // when
        const [updatedDate, isError] = processTimeUnits(date, timeData);

        // then
        expect(updatedDate).toEqual(date); // same date should be returned
        expect(isError).toBe(true);
    });

    // continue defining more tests according to different function usages
});

