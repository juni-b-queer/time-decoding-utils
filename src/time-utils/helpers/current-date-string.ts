import moment from "moment";

export function getCurrentDateString() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month: string | number = currentDate.getMonth() + 1; // getMonth() returns month from 0 to 11
  let day: string | number = currentDate.getDate();

  // prepend 0 to single digit month and day
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  return `${year}-${month}-${day}`;
}

export function getNextDateTime(inputTimeString: string = ""): string {
  const isInputEmpty = inputTimeString === "";
  if (isInputEmpty) {
    inputTimeString = moment().add(1, "minutes").format("hh:mma").toUpperCase();
  }
  const currentTime = moment();
  const inputTime = moment(inputTimeString, ["hA", "hh:mma"]);

  if (currentTime.isBefore(inputTime)) {
    if (isInputEmpty) inputTimeString = moment().format("hh:mma").toUpperCase();
    return currentTime.format("YYYY-MM-DD") + " " + inputTimeString;
  } else {
    return (
      currentTime.add(1, "days").format("YYYY-MM-DD") + " " + inputTimeString
    );
  }
}
