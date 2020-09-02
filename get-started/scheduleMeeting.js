const dayStart = "07:30";
const dayEnd = "17:45";

function scheduleMeeting(startTime, durationMinutes) {
  const normalizeTime = time => (time.length == 4 ? time.padStart(time.length + 1, "0") : time);

  function addMinutes(time, minutesToAdd) {
    time = normalizeTime(time);
    const m = time.slice(time.indexOf(":") + 1);
    const minutes = Number.parseInt(m) + minutesToAdd;
    const hours = Number.parseInt(time.slice(0, time.indexOf(":")));

    return minutes >= 60
      ? `${hours + 1 >= 10 ? hours + 1 : `0${hours}`}:${minutes == 60 ? "00" : minutes - 60}`
      : `${hours}:${minutes}`;
  }

  startTime = normalizeTime(startTime);
  const endTime = addMinutes(startTime, durationMinutes);
  const dStart = normalizeTime(dayStart);

  if (startTime < dStart) {
    return false;
  }

  if (startTime >= dayEnd || endTime > dayEnd) {
    return false;
  }

  return true;
}

console.log(scheduleMeeting("7:00", 15)); // false
console.log(scheduleMeeting("07:15", 30)); // false
console.log(scheduleMeeting("7:30", 30)); // true
console.log(scheduleMeeting("11:30", 60)); // true
console.log(scheduleMeeting("17:00", 45)); // true
console.log(scheduleMeeting("17:30", 30)); // false
console.log(scheduleMeeting("18:00", 15)); // false
