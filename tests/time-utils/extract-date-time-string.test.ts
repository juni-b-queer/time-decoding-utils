import {
  addLeadingZeros,
  extractDate,
  extractDateTime,
  extractDateTimeString,
  extractTime,
  replaceSlashWithHyphen,
} from "../../src";
import { advanceTo, clear } from "jest-date-mock";

describe("extractDateTimeString Test Suite", () => {
  beforeAll(() => {
    advanceTo(new Date("2024-01-16T12:00:00-05:00")); // Mock the date
  });

  afterAll(() => {
    clear(); // Clear the mock
  });
  it('should extract "12/24/2024" from the string "on 12/24/2024 random stuff"', () => {
    const input = "on 12/24/2024 random stuff";
    const expected = "12-24-2024";
    expect(extractDateTimeString(input)).toEqual(expected);
  });

  it('should extract "12:30:00.000Z" ', () => {
    const input = "12:30:00.000Z";
    const expected = "2024-01-16 12:30:00.000Z";
    expect(extractDateTimeString(input)).toEqual(expected);
  });

  it('should extract "2024-12-24" from the string "on 2024-12-24 hello world"', () => {
    const input = "on 2024-12-24 hello world";
    const expected = "2024-12-24";
    expect(extractDateTimeString(input)).toEqual(expected);
  });

  it('should extract "12/24/2024 1PM" from the string "1PM on 12/24/2024 i\'m flying"', () => {
    const input = "1PM on 12/24/2024 i'm flying";
    const expected = "12-24-2024 01:00PM";
    expect(extractDateTimeString(input)).toEqual(expected);
  });

  it('should extract "9/3/24 4PM" from the string with a lot of words', () => {
    const input =
      "4PM on 9/3/24 a long string of words and stuff that also has the word on or at to throw off and test the functions handling";
    const expected = "09-03-2024 04:00PM";
    expect(extractDateTimeString(input)).toEqual(expected);
  });

  it('should extract "8/17/25 10:30AM" from the string "8/17/25 at 10:30am i want to go to sleep at night"', () => {
    const input = "8/17/25 at 10:30am i want to go to sleep at night";
    const expected = "08-17-2025 10:30AM";
    expect(extractDateTimeString(input)).toEqual(expected);
  });

  it('should extract "2024-12-24 1PM" from the string "2024-12-24 1PM"', () => {
    const input = "2024-12-24 1PM";
    const expected = "2024-12-24 01:00PM";
    expect(extractDateTimeString(input)).toEqual(expected);
  });

  it('should extract "2024-12-24T13:00:00" from the string "2024-12-24T13:00:00Z this is another example"', () => {
    const input = "2024-12-24T13:00:00Z this is another example";
    const expected = "2024-12-24T13:00:00";
    expect(extractDateTimeString(input)).toEqual(expected);
  });

  it('should extract "2026-02-28 2AM" from the string with a lot of words', () => {
    const input = "2026-02-28 2AM a string to do a thing at a time";
    const expected = "2026-02-28 02:00AM";
    expect(extractDateTimeString(input)).toEqual(expected);
  });

  it('should extract "2026-02-05 2AM" from the string ', () => {
    const input = "26-2-5 2AM a string to do a thing at a time";
    const expected = "2026-02-05 02:00AM";
    expect(extractDateTimeString(input)).toEqual(expected);
  });

  it('should extract "2024-10-31T06:00:00" from the string "2024-10-31T06:00:00 example text"', () => {
    const input = "2024-10-31T06:00:00 example text";
    const expected = "2024-10-31T06:00:00";
    expect(extractDateTimeString(input)).toEqual(expected);
  });

  it('should extract "09-02-2024 4PM" from the string "9-2-24 4PM example text"', () => {
    const input = "9-2-24 4PM example text";
    const expected = "09-02-2024 04:00PM";
    expect(extractDateTimeString(input)).toEqual(expected);
  });

  it("should return an empty string when given a string that does not match any datetime format", () => {
    const input = "This doesn't contain a datetime!";
    const expected = "";
    expect(extractDateTimeString(input)).toBe(expected);
  });

  it("should return an empty string when given a string that does not match any datetime format", () => {
    const input = "in like 10 days, 20 minutes";
    const expected = "";
    expect(extractDateTimeString(input)).toBe(expected);
  });

  it('should extract "10PM" from the string "10PM example text"', () => {
    const input = "10PM example text";
    const expected = "2024-01-16 10:00PM";
    expect(extractDateTimeString(input)).toEqual(expected);
  });

  it('should extract "10:30PM" from the string "10:30PM example text"', () => {
    const input = "10:30PM example text";
    const expected = "2024-01-16 10:30PM";
    expect(extractDateTimeString(input)).toEqual(expected);
  });

  it('should extract "10:30AM" from the string "10:30AM example text"', () => {
    const input = "10:30AM example text";
    const expected = "2024-01-17 10:30AM";
    expect(extractDateTimeString(input)).toEqual(expected);
  });

  it('should extract "10AM" from the string "10AM example text"', () => {
    const input = "10AM example text";
    const expected = "2024-01-17 10:00AM";
    expect(extractDateTimeString(input)).toEqual(expected);
  });

  it("should extract valid Time string from 20:15:00.000Z in UTC when time ends in Z", () => {
    const input = "The time is 20:15:00.000Z in HH:mm:ssZ format";
    const expected = "2024-01-16 20:15:00.000Z";
    expect(extractDateTimeString(input)).toEqual(expected);
  });
});

describe("AddLeadingZeros Test Suite", () => {
  describe("input format leading year", () => {
    describe("input format yyyy-m-dd", () => {
      it("2024-2-24 returns 2024-02-24 ", () => {
        const input = "2024-2-24";
        const expected = "2024-02-24";
        expect(addLeadingZeros(input)).toEqual(expected);
      });

      it("2032-9-12 returns 2032-09-12 ", () => {
        const input = "2032-9-12";
        const expected = "2032-09-12";
        expect(addLeadingZeros(input)).toEqual(expected);
      });
    });

    describe("input format yyyy-mm-d", () => {
      it("2024-02-3 returns 2024-02-03 ", () => {
        const input = "2024-02-3";
        const expected = "2024-02-03";
        expect(addLeadingZeros(input)).toEqual(expected);
      });

      it("2032-09-1 returns 2032-09-01 ", () => {
        const input = "2032-09-1";
        const expected = "2032-09-01";
        expect(addLeadingZeros(input)).toEqual(expected);
      });
    });

    describe("input format yyyy-m-d", () => {
      it("2024-2-3 returns 2024-02-03 ", () => {
        const input = "2024-2-3";
        const expected = "2024-02-03";
        expect(addLeadingZeros(input)).toEqual(expected);
      });

      it("2032-9-1 returns 2032-09-01 ", () => {
        const input = "2032-9-1";
        const expected = "2032-09-01";
        expect(addLeadingZeros(input)).toEqual(expected);
      });
    });

    describe("input format yy-m-d", () => {
      it("24-2-3 returns 2024-02-03 ", () => {
        const input = "24-2-3";
        const expected = "2024-02-03";
        expect(addLeadingZeros(input)).toEqual(expected);
      });

      it("32-9-1 returns 2032-09-01 ", () => {
        const input = "32-9-1";
        const expected = "2032-09-01";
        expect(addLeadingZeros(input)).toEqual(expected);
      });
    });

    describe("input format yy-mm-d", () => {
      it("24-12-3 returns 2024-12-03 ", () => {
        const input = "24-12-3";
        const expected = "2024-12-03";
        expect(addLeadingZeros(input)).toEqual(expected);
      });

      it("32-10-1 returns 2032-10-01 ", () => {
        const input = "32-10-1";
        const expected = "2032-10-01";
        expect(addLeadingZeros(input)).toEqual(expected);
      });
    });

    describe("input format yy-m-dd", () => {
      it("24-2-10 returns 2024-2-10 ", () => {
        const input = "24-2-10";
        const expected = "2024-02-10";
        expect(addLeadingZeros(input)).toEqual(expected);
      });

      it("32-1-11 returns 2032-01-11 ", () => {
        const input = "32-1-11";
        const expected = "2032-01-11";
        expect(addLeadingZeros(input)).toEqual(expected);
      });
    });

    describe("input format yy-mm-dd", () => {
      it("24-12-24 returns 2024-12-24 ", () => {
        const input = "24-12-24";
        const expected = "2024-12-24";
        expect(addLeadingZeros(input)).toEqual(expected);
      });

      it("32-09-12 returns 2032-09-12 ", () => {
        const input = "32-09-12";
        const expected = "2032-09-12";
        expect(addLeadingZeros(input)).toEqual(expected);
      });
      it("24-12-10 returns 2024-12-10 ", () => {
        const input = "24-12-10";
        const expected = "2024-12-10";
        expect(addLeadingZeros(input)).toEqual(expected);
      });

      it("32-09-11 returns 2032-09-11 ", () => {
        const input = "32-09-11";
        const expected = "2032-09-11";
        expect(addLeadingZeros(input)).toEqual(expected);
      });
    });
  });

  describe("input format trailing year", () => {
    describe("input format mm-dd-yyyy", () => {
      it("02-12-2024 returns 02-12-2024 ", () => {
        const input = "02-12-2024";
        const expected = "02-12-2024";
        expect(addLeadingZeros(input)).toEqual(expected);
      });

      it("10-03-2025 returns 10-03-2025 ", () => {
        const input = "10-03-2025";
        const expected = "10-03-2025";
        expect(addLeadingZeros(input)).toEqual(expected);
      });
    });

    describe("input format mm-dd-yy", () => {
      it("02-12-24 returns 02-12-2024 ", () => {
        const input = "02-12-24";
        const expected = "02-12-2024";
        expect(addLeadingZeros(input)).toEqual(expected);
      });

      it("12-24-25 returns 12-24-2025 ", () => {
        const input = "12-24-25";
        const expected = "12-24-2025";
        expect(addLeadingZeros(input)).toEqual(expected);
      });
    });

    describe("input format m-dd-yy", () => {
      it("2-12-24 returns 02-12-2024 ", () => {
        const input = "02-12-24";
        const expected = "02-12-2024";
        expect(addLeadingZeros(input)).toEqual(expected);
      });

      it("4-24-25 returns 04-24-2025 ", () => {
        const input = "4-24-25";
        const expected = "04-24-2025";
        expect(addLeadingZeros(input)).toEqual(expected);
      });
    });

    describe("input format mm-d-yy", () => {
      it("02-1-24 returns 02-01-2024 ", () => {
        const input = "02-1-24";
        const expected = "02-01-2024";
        expect(addLeadingZeros(input)).toEqual(expected);
      });

      it("11-9-25 returns 11-09-2025 ", () => {
        const input = "11-9-25";
        const expected = "11-09-2025";
        expect(addLeadingZeros(input)).toEqual(expected);
      });
    });

    describe("input format m-d-yy", () => {
      it("3-4-29 returns 03-04-2029 ", () => {
        const input = "3-4-29";
        const expected = "03-04-2029";
        expect(addLeadingZeros(input)).toEqual(expected);
      });

      it("9-8-24 returns 09-08-2024 ", () => {
        const input = "9-8-24";
        const expected = "09-08-2024";
        expect(addLeadingZeros(input)).toEqual(expected);
      });
    });

    describe("input format m-dd-yyyy", () => {
      it("1-02-2046 returns 01-02-2046 ", () => {
        const input = "1-02-2046";
        const expected = "01-02-2046";
        expect(addLeadingZeros(input)).toEqual(expected);
      });

      it("4-10-2024 returns 04-10-2024 ", () => {
        const input = "4-10-2024";
        const expected = "04-10-2024";
        expect(addLeadingZeros(input)).toEqual(expected);
      });
    });

    describe("input format mm-d-yyyy", () => {
      it("02-1-2036 returns 02-01-2036 ", () => {
        const input = "02-1-2036";
        const expected = "02-01-2036";
        expect(addLeadingZeros(input)).toEqual(expected);
      });

      it("11-9-2026 returns 11-09-2026 ", () => {
        const input = "11-9-2026";
        const expected = "11-09-2026";
        expect(addLeadingZeros(input)).toEqual(expected);
      });
    });

    describe("input format m-d-yyyy", () => {
      it("1-2-2024 returns 01-02-2024 ", () => {
        const input = "1-2-2024";
        const expected = "01-02-2024";
        expect(addLeadingZeros(input)).toEqual(expected);
      });

      it("4-9-2078 returns 04-09-2078 ", () => {
        const input = "4-9-2078";
        const expected = "04-09-2078";
        expect(addLeadingZeros(input)).toEqual(expected);
      });
    });
  });

  describe("invalid date input", () => {
    it("should throw an error if date format is invalid", () => {
      const input = "invalid-date";
      expect(() => addLeadingZeros(input)).toThrow(`Invalid date format`);
    });

    it("should throw an error if date component is missing", () => {
      const input = "2022-11";
      expect(() => addLeadingZeros(input)).toThrow(`Invalid date format`);
    });
  });
});

describe("Testing extractDateTime function from time-decoding-utils module", () => {
  it("should extract valid DateTime string", () => {
    const input = "The date is 2025-07-01T14:30:15Z in ISO format";
    const output = extractDateTime(input);
    expect(output).toEqual("2025-07-01T14:30:15");
  });

  it("should return false for invalid DateTime string", () => {
    const input = "No date here";
    const output = extractDateTime(input);
    expect(output).toBe(false);
  });
});

// Testing extractDate function
describe("Testing extractDate function from time-decoding-utils module", () => {
  it("should extract valid Date string", () => {
    const input = "The date is 2025-07-01 in YYYY-MM-DD format";
    const output = extractDate(input);
    expect(output).toEqual("2025-07-01");
  });

  it("should return false for invalid Date string", () => {
    const input = "No date here";
    const output = extractDate(input);
    expect(output).toBe(false);
  });
});

// Testing extractTime function
describe("Testing extractTime function from time-decoding-utils module", () => {
  it("should extract valid Time string", () => {
    const input = "The time is 14:30:15Z in HH:mm:ssZ format";
    const output = extractTime(input);
    expect(output).toEqual("14:30:15Z");
  });

  it("should extract valid Time string", () => {
    const input = "The time is 12:30:00Z in HH:mm:ssZ format";
    const output = extractTime(input);
    expect(output).toEqual("12:30:00Z");
  });

  it("should return false for invalid Time string", () => {
    const input = "No time here";
    const output = extractTime(input);
    expect(output).toBe(false);
  });
});

describe("Testing addLeadingZeros function from time-decoding-utils module", () => {
  it("if all parts of date have correct number of digits, return date as it is", () => {
    const input = "2025-07-01";
    const result = addLeadingZeros(input);
    expect(result).toEqual("2025-07-01");
  });

  it("if parts of date are having less digits, add leading zeros", () => {
    const input = "2024-7-1";
    const result = addLeadingZeros(input);
    expect(result).toEqual("2024-07-01");
  });

  it("if year is 2-digit and >=24, consider it as 20xx", () => {
    const input = "29-7-1";
    const result = addLeadingZeros(input);
    expect(result).toEqual("2029-07-01");
  });

  it("if year is 2-digit and it is in last part, consider it as 20xx", () => {
    const input = "7-1-29";
    const result = addLeadingZeros(input);
    expect(result).toEqual("07-01-2029");
  });

  it("should throw an error for invalid date format", () => {
    const input = "7-1";
    expect(() => addLeadingZeros(input)).toThrowError(
      new Error("Invalid date format"),
    );
  });
});

// Testing replaceSlashWithHyphen function
describe("Testing replaceSlashWithHyphen function from time-decoding-utils module", () => {
  it("should replace all slashes with hyphens in the date string", () => {
    const input = "07/01/2025";
    const result = replaceSlashWithHyphen(input);
    expect(result).toEqual("07-01-2025");
  });

  it("if there are no slashes in the input, should return the input string as it is", () => {
    const input = "07-01-2025";
    const result = replaceSlashWithHyphen(input);
    expect(result).toEqual("07-01-2025");
  });
});
