export default function convertFromMs(timeInMs) {
  const hour = 3600000;
  const minute = 60000;
  const second = 1000;
  let remainingTime = timeInMs;
  let hours = Math.floor(remainingTime / hour);
  hours = hours.toString().length === 1 ? `0${hours}` : hours.toString();
  remainingTime = remainingTime % hour;

  let minutes = Math.floor(remainingTime / minute);
  minutes =
    minutes.toString().length === 1 ? `0${minutes}` : minutes.toString();
  remainingTime = remainingTime % minute;

  let seconds = Math.floor(remainingTime / second);
  seconds =
    seconds.toString().length === 1 ? `0${seconds}` : seconds.toString();

  return `${hours}:${minutes}:${seconds}`;
}
