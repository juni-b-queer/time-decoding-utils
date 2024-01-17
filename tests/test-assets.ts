// export const testDate = "2024-01-14T12:00:00Z";
//
// const examplesConvertDateTimeToISO = [
//   {
//     input: "12/24/2024",
//     expected: "2024-12-24T12:00:00", // Fill with the correct ISO timestamp
//   },
//   {
//     input: "2024-12-24",
//     expected: "2024-12-24T12:00:00", // Fill with the correct ISO timestamp
//   },
//   {
//     input: "12/24/2024 1PM",
//     expected: "2024-12-24T13:00:00", // Fill with the correct ISO timestamp
//   },
//   {
//     input: "9/3/24 4PM",
//     expected: "2024-09-03T16:00:00", // Fill with the correct ISO timestamp
//   },
//   {
//     input: "8/17/25 10:30AM",
//     expected: "2025-08-17T10:30:00", // Fill with the correct ISO timestamp
//   },
//   {
//     input: "2024-12-24 1PM",
//     expected: "2024-12-24T13:00:00", // Fill with the correct ISO timestamp
//   },
//   {
//     input: "2024-12-24T13:00:00",
//     expected: "2024-12-24T13:00:00", // Fill with the correct ISO timestamp
//   },
//   {
//     input: "2026-02-28 2AM",
//     expected: "2026-02-28T02:00:00", // Fill with the correct ISO timestamp
//   },
//   {
//     input: "2024-10-31T06:00:00",
//     expected: "2024-10-31T06:00:00", // Fill with the correct ISO timestamp
//   },
// ];
//
// const examplesExtractDateTime = [
//   {
//     input: "on 12/24/2024 random stuff",
//     expected: "12/24/2024",
//   },
//   {
//     input: "on 2024-12-24 hello world",
//     expected: "2024-12-24",
//   },
//   {
//     input: "1PM on 12/24/2024 i'm flying",
//     expected: "12/24/2024 1PM",
//   },
//   {
//     input:
//       "4PM on 9/3/24 a long string of words and stuff that also has the word on or at to throw off and test the functions handling",
//     expected: "9/3/24 4PM",
//   },
//   {
//     input: "8/17/25 at 10:30am i want to go to sleep at night",
//     expected: "8/17/25 10:30AM",
//   },
//   {
//     input: "2024-12-24 1PM",
//     expected: "2024-12-24 1PM",
//   },
//   {
//     input: "2024-12-24T13:00:00Z this is another example",
//     expected: "2024-12-24T13:00:00",
//   },
//   {
//     input: "2026-02-28 2AM a string to do a thing at a time",
//     expected: "2026-02-28 2AM",
//   },
//   {
//     input: "2024-10-31T06:00:00 example text",
//     expected: "2024-10-31T06:00:00",
//   },
// ];
//
// export const testTimes = {
//   datestamp: [
//     {
//       input: "remindme! 12/24 random text blah blah",
//       extracted: "12/24",
//       expected: "2024-12-24T12:00:00Z",
//     },
//     {
//       input: "remindme! 10/31/2024 random text blah blah",
//       extracted: "12/24",
//       expected: "2024-12-24T12:00:00Z",
//     },
//   ],
//   calculation: [
//     {
//       input: "remindme! 1 day, 20 minutes for my laundry",
//       extracted: "1 day, 20 minutes",
//       expected: "2024-01-15T12:20:00Z",
//     },
//     {
//       input: "remindme! 1 day, 20 minutes, 2 weeks for my laundry",
//       extracted: "1 day, 20 minutes, 2 weeks",
//       expected: "2024-01-29T12:20:00Z",
//     },
//   ],
// };
//
// export const TimeInputs = [];
