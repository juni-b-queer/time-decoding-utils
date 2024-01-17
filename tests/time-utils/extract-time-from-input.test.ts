import {extractTimeFromInput} from "../../src";
import {advanceTo, clear} from "jest-date-mock";

describe('extractTimeFromInput Test Suite', () => {


    it('true', ()=>{
        expect(true).toEqual(true)
    })
    beforeAll(() => {
        advanceTo(new Date(Date.UTC(2024, 1, 16, 12, 0, 0)));
        // advanceTo(new Date("2024-01-16T12:00:00"));    // Mock the date
    });

    afterAll(() => {
        clear();    // Clear the mock
    });


    it('should return date for "1 day" input', () => {
        const input = "1 day";
        const expected = "2024-01-17T18:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "1 hour" input', () => {
        const input = "1 hour";
        const expected = "2024-01-16T19:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "1 year, three days" input', () => {
        const input = "1 year, three days";
        const expected = "2025-01-19T18:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "two days, three minutes" input', () => {
        const input = "two days, three minutes";
        const expected = "2024-01-18T18:03:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "12/24/2025" input', () => {
        const input = "12/24/2025";
        const expected = "2025-12-24T18:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "12/24/2025 at 2PM" input', () => {
        const input = "12/24/2025 at 2PM";
        const expected = "2025-12-24T20:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "07/24/2025 at 2PM" input', () => {
        const input = "07/24/2025 at 2PM";
        const expected = "2025-07-24T19:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "12/24/2025 2PM" input', () => {
        const input = "12/24/2025 2PM";
        const expected = "2025-12-24T20:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "2025-12-24 2PM" input', () => {
        const input = "2025-12-24 2PM";
        const expected = "2025-12-24T20:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "2025-12-24T14:00:00" input', () => {
        const input = "2025-12-24T14:00:00";
        const expected = "2025-12-24T14:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "12-2-24" input', () => {
        const input = "12-2-24";
        const expected = "2024-12-02T18:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "12-2-24 4PM" input', () => {
        const input = "12-2-24 4PM";
        const expected = "2024-12-02T22:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "9-2-24 4PM" input', () => {
        const input = "9-2-24 4PM";
        const expected = "2024-09-02T21:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "1 months, 1 day" input', () => {
        const input = "1 months, 1 day";
        const expected = "2024-02-17T18:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "2 months, 1 day" input', () => {
        const input = "2 months, 1 day";
        const expected = "2024-03-17T17:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "3 months, 1 day" input', () => {
        const input = "3 months, 1 day";
        const expected = "2024-04-17T17:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "4 months, 1 day" input', () => {
        const input = "4 months, 1 day";
        const expected = "2024-05-17T17:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "5 months, 1 day" input', () => {
        const input = "5 months, 1 day";
        const expected = "2024-06-17T17:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "6 months, 1 day" input', () => {
        const input = "6 months, 1 day";
        const expected = "2024-07-17T17:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "7 months, 1 day" input', () => {
        const input = "7 months, 1 day";
        const expected = "2024-08-17T17:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "8 months, 1 day" input', () => {
        const input = "8 months, 1 day";
        const expected = "2024-09-17T17:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "9 months, 1 day" input', () => {
        const input = "9 months, 1 day";
        const expected = "2024-10-17T17:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "10 months, 1 day" input', () => {
        const input = "10 months, 1 day";
        const expected = "2024-11-17T18:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "11 months, 1 day" input', () => {
        const input = "11 months, 1 day";
        const expected = "2024-12-17T18:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });

    it('should return date for "11 months, 1 day" input', () => {
        const input = "12 months, 1 day";
        const expected = "2025-01-17T18:00:00.000Z";
        expect(extractTimeFromInput(input)).toEqual(expected);
    });
});