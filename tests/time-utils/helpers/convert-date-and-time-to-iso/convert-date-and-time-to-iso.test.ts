import { convertDateAndTimeToIso } from "../../../../src";
import { advanceTo, clear } from "jest-date-mock";

describe("convertDateAndTimeToIso Test Suite", () => {
  beforeAll(() => {
    advanceTo(new Date("2024-01-16T12:00:00")); // Mock the date
  });

  afterAll(() => {
    clear(); // Clear the mock
  });

  describe("MM-DD-YYYY Format", () => {
    it('should convert "12-24-2024" to ISO timestamp', () => {
      const input = "12-24-2024";
      const expected = "2024-12-24T18:00:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
    it('should convert "08-10-2124" to ISO timestamp', () => {
      const input = "08-10-2124";
      const expected = "2124-08-10T17:00:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
    it('should convert "11-04-2034" to ISO timestamp', () => {
      const input = "11-30-2034";
      const expected = "2034-11-30T18:00:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
  });

  describe("HH:MM:SSZ Format", () => {
    it('should convert "12:30:00Z" to ISO timestamp', () => {
      const input = "12:30:00Z";
      const expected = "2024-01-16T12:30:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
    it('should convert "12:30:00.000Z" to ISO timestamp', () => {
      const input = "12:30:00.000Z";
      const expected = "2024-01-16T12:30:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
  });

  describe("MM-DD-YYYY hhAMPM Format", () => {
    it('should convert "12-24-2024 1PM" to ISO timestamp', () => {
      const input = "12-24-2024 1PM";
      const expected = "2024-12-24T19:00:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
    it('should convert "09-03-2024 4PM" to ISO timestamp', () => {
      const input = "09-03-2024 4PM";
      const expected = "2024-09-03T21:00:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
    it('should convert "01-17-2025 10PM" to ISO timestamp', () => {
      const input = "01-17-2025 10PM";
      const expected = "2025-01-18T04:00:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
    it('should convert "09-02-2024 4PM" to ISO timestamp', () => {
      const input = "09-02-2024 4PM";
      const expected = "2024-09-02T21:00:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
    it('should convert "09-02-2024 4PM" to ISO timestamp', () => {
      const input = "09-02-2024 4PM";
      const expected = "2024-09-02T21:00:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
    it('should convert "01-17-2025 10:45AM" to ISO timestamp', () => {
      const input = "01-17-2025 10:45AM";
      const expected = "2025-01-17T16:45:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
    it('should convert "01-17-2025 11:59PM" to ISO timestamp', () => {
      const input = "01-17-2025 11:59PM";
      const expected = "2025-01-18T05:59:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
  });

  describe("YYYY-MM-DD hhAMPM Format", () => {
    it('should convert "2024-12-24 1PM" to ISO timestamp', () => {
      const input = "2024-12-24 1PM";
      const expected = "2024-12-24T19:00:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
    it('should convert "2026-02-28 2AM" to ISO timestamp', () => {
      const input = "2026-02-28 2AM";
      const expected = "2026-02-28T08:00:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
  });

  describe("YYYY-MM-DDTHH:MM:SS Format", () => {
    it('should convert "2024-12-24T13:00:00" to ISO timestamp', () => {
      const input = "2024-12-24T13:00:00";
      const expected = "2024-12-24T13:00:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
    it('should convert "2024-10-31T06:00:00" to ISO timestamp', () => {
      const input = "2024-10-31T06:00:00";
      const expected = "2024-10-31T06:00:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
  });

  describe("YYYY-MM-DD Format", () => {
    it('should convert "2024-12-24" to ISO timestamp', () => {
      const input = "2024-12-24";
      const expected = "2024-12-24T18:00:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
  });

  describe("YYYY-MM-DD HH:MM:SS.sssZ Format", () => {
    it('should convert "2024-01-16 20:15:00.000Z" to ISO timestamp', () => {
      const input = "2024-01-16 20:15:00.000Z";
      const expected = "2024-01-16T20:15:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
    it('should convert "2024-01-16 20:15:00Z" to ISO timestamp', () => {
      const input = "2024-01-16 20:15:00Z";
      const expected = "2024-01-16T20:15:00.000Z";
      expect(convertDateAndTimeToIso(input)).toEqual(expected);
    });
  });

  describe("Invalid Input", () => {
    it("should throw an error for invalid input", () => {
      const input = "Invalid Date";
      expect(() => convertDateAndTimeToIso(input)).toThrow(Error);
    });
  });
});
