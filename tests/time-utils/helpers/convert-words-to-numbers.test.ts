import {convertWordsToNumbers} from "../../../src";

describe("convertWordsToNumbers Correctly converts word numbers to digit numbers", () => {
  test("Test example: one", () => {
    expect(convertWordsToNumbers("one")).toBe("1");
  });

  test("Test example: twenty", () => {
    expect(convertWordsToNumbers("twenty")).toBe("20");
  });

  test("Test example: one hundred", () => {
    expect(convertWordsToNumbers("one hundred")).toBe("100");
  });

  test("Test example: one million", () => {
    expect(convertWordsToNumbers("one million")).toBe("1000000");
  });

  test("Test example: one thousand", () => {
    expect(convertWordsToNumbers("one thousand")).toBe("1000");
  });

  test("Test example: twenty-three", () => {
    expect(convertWordsToNumbers("twenty-three")).toBe("23");
  });

  test("Test example: one million four hundred thousand twenty-seven", () => {
    expect(
      convertWordsToNumbers("one million four hundred thousand twenty-seven"),
    ).toBe("1400027");
  });

  test("Test example: one hundred thousand two hundred three", () => {
    expect(
      convertWordsToNumbers("one hundred thousand two hundred three"),
    ).toBe("100203");
  });

  test("Test example: one hundred twenty", () => {
    expect(convertWordsToNumbers("one hundred twenty")).toBe("120");
  });

  test("Test example: one hundred and twenty", () => {
    expect(convertWordsToNumbers("one hundred and twenty")).toBe("120");
  });

  test("Test example: thirty five", () => {
    expect(convertWordsToNumbers("thirty five")).toBe("35");
  });

  test("Test example: thirty-five", () => {
    expect(convertWordsToNumbers("thirty-five")).toBe("35");
  });

  test("Test example: one thousand thirty-five", () => {
    expect(convertWordsToNumbers("one thousand thirty-five")).toBe("1035");
  });

  test("Test example: one thousand and thirty-five", () => {
    expect(convertWordsToNumbers("one thousand and thirty-five")).toBe("1035");
  });

  test("Test example: twelve", () => {
    expect(convertWordsToNumbers("twelve")).toBe("12");
  });

  test("Test example: invalid", () => {
    expect(() => convertWordsToNumbers("invalid")).toThrow(Error);
  });
});
