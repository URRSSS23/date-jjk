const days = [
    'Duminică (Sunday)', 'Luni (Monday)', 'Marți (Tuesday)', 'Miercuri (Wednesday)',
    'Joi (Thursday)', 'Vineri (Friday)', 'Sâmbătă (Saturday)'
];

let lastDay = null;

function pad(n) {
    return n < 10 ? '0' + n : n;
}

function updateDayIndicator(dayIndex) {
    document.querySelectorAll('.day-dot').forEach(dot => {
        dot.classList.toggle('active', Number(dot.dataset.day) === dayIndex);
    });
}

function updateTime() {
    const now = new Date();
    const roTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Bucharest' }));
    const dayIndex = roTime.getDay();

    // Update day only if changed
    if (dayIndex !== lastDay) {
        document.getElementById('currentDay').textContent = days[dayIndex];
        updateDayIndicator(dayIndex);
        lastDay = dayIndex;
    }

    // Update date only if changed
    const dateStr = [
        pad(roTime.getDate()),
        pad(roTime.getMonth() + 1),
        roTime.getFullYear()
    ].join('.');
    const dateEl = document.getElementById('currentDate');
    if (dateEl.textContent !== dateStr) dateEl.textContent = dateStr;

    // Update time
    const hours = pad(roTime.getHours());
    const minutes = pad(roTime.getMinutes());
    const seconds = pad(roTime.getSeconds());

    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (hoursEl.textContent !== hours) hoursEl.textContent = hours;
    if (minutesEl.textContent !== minutes) minutesEl.textContent = minutes;
    if (secondsEl.textContent !== seconds) secondsEl.textContent = seconds;
}

// Debounce for resize
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Example resizeVideo function (implement as needed)
function resizeVideo() {
    // Optionally adjust video size/responsiveness here
}

const debouncedResizeVideo = debounce(resizeVideo, 250);
window.addEventListener('resize', debouncedResizeVideo);

// Mute/unmute video
document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    setInterval(updateTime, 1000);

    const video = document.getElementById('bg-video');
    const muteButton = document.getElementById('muteButton');
    const soundIcon = document.getElementById('soundIcon');
    const soundText = document.getElementById('soundText');

    muteButton.addEventListener('click', () => {
        video.muted = !video.muted;
        if (video.muted) {
            soundIcon.textContent = '🔇';
            soundText.textContent = 'Sunet OFF';
        } else {
            soundIcon.textContent = '🔊';
            soundText.textContent = 'Sunet ON';
        }
    });

    // Set initial day indicator
    const now = new Date();
    const roTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Bucharest' }));
    updateDayIndicator(roTime.getDay());
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});