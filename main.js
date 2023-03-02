const TO = Date.parse("2023-03-10T16:00:00.000+01:00");

const FACTORS = Object.freeze({
    DAYS: 1000 * 60 * 60 * 24,
    HOURS: 1000 * 60 * 60,
    MINUTES: 1000 * 60,
    SECONDS: 1000,
});

const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");
let days, hours, minutes, seconds;
let start;

function update() {
    let delta = TO - Date.now();
    if (delta <= 0) return;
    days = (delta / FACTORS.DAYS) | 0;
    delta -= days * FACTORS.DAYS;
    hours = (delta / FACTORS.HOURS) | 0;
    delta -= hours * FACTORS.HOURS;
    minutes = (delta / FACTORS.MINUTES) | 0;
    delta -= minutes * FACTORS.MINUTES;
    seconds = (delta / FACTORS.SECONDS) | 0;
}

function leftPadNumber(number, length) {
    return number.toString().padStart(length, "0");
}

function rerender() {
    daysEl.innerHTML = leftPadNumber(days, 2);
    hoursEl.innerHTML = leftPadNumber(hours, 2);
    minutesEl.innerHTML = leftPadNumber(minutes, 2);
    secondsEl.innerHTML = leftPadNumber(seconds, 2);
}

function tick(timestamp) {
    start = start === undefined ? timestamp : start;
    const elapsed = timestamp - start;
    if (elapsed > 1000) {
        update();
        rerender();
        start = timestamp;
    }

    window.requestAnimationFrame(tick);
}

update();
rerender();
window.requestAnimationFrame(tick);
