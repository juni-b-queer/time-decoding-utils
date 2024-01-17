const smallNumbers: { [key: string]: number } = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
};

const magnitudeNumbers: { [key: string]: number } = {
  thousand: 1000,
  million: 1_000_000,
  billion: 1_000_000_000,
  trillion: 1_000_000_000_000,
  quadrillion: 1_000_000_000_000_000,
  quintillion: 1_000_000_000_000_000_000,
  sextillion: 1_000_000_000_000_000_000_000,
  septillion: 1_000_000_000_000_000_000_000_000,
  octillion: 1_000_000_000_000_000_000_000_000_000,
  nonillion: 1_000_000_000_000_000_000_000_000_000_000,
  decillion: 1_000_000_000_000_000_000_000_000_000_000_000,
};

export function convertWordsToNumbers(input: string): string {
  const words = input.split(/\s|-/).filter((word) => word !== "and");
  let totalNumber = 0;
  let currentNumber = 0;
  for (let word of words) {
    const smallNumber = smallNumbers[word];
    if (smallNumber !== undefined) {
      currentNumber += smallNumber;
    } else if (word === "hundred" && currentNumber !== 0) {
      currentNumber *= 100;
    } else {
      const magnitude = magnitudeNumbers[word];
      if (magnitude !== undefined) {
        totalNumber += currentNumber * magnitude;
        currentNumber = 0;
      } else {
        throw new Error("Unknown number: " + word);
      }
    }
  }
  let value = totalNumber + currentNumber;
  return value.toString();
}
