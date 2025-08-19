// ---- Password Guard ----
function guard() {
    let pass = prompt("Enter Password:");
    if (pass !== "aby2024") {
        alert("Wrong password!");
        window.location.href = "about:blank";
    }
}

function logout() {
    alert("Logged out!");
    window.location.href = "about:blank";
}

// ---- Music Player ----
const tracks = [
    { title: "Those Eyes - New West", src: "music/Those_Eyes.mp3" },
    { title: "Car’s Outside - James Arthur", src: "music/Cars_Outside.mp3" },
    { title: "A Sky Full of Stars - Coldplay", src: "music/A_Sky_Full_of_Stars.mp3" },
    { title: "Fast Car - Jonas Blue", src: "music/Fast_Car.mp3" }
];

let currentTrack = 0;
let audio, titleEl, playBtn, seekBar, currentEl, durationEl;

function initPlayer() {
    audio = document.getElementById("audio");
    titleEl = document.getElementById("track-title");
    playBtn = document.getElementById("play-btn");
    seekBar = document.getElementById("seek");
    currentEl = document.getElementById("current");
    durationEl = document.getElementById("duration");

    loadTrack(currentTrack);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", nextTrack);
}

function loadTrack(index) {
    audio.src = tracks[index].src;
    titleEl.textContent = tracks[index].title;
    seekBar.value = 0;
    currentEl.textContent = "0:00";
    durationEl.textContent = "0:00";

    audio.onloadedmetadata = () => {
        durationEl.textContent = formatTime(audio.duration);
    };
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    audio.play();
    playBtn.textContent = "⏸";
}

function prevTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    audio.play();
    playBtn.textContent = "⏸";
}

function updateProgress() {
    seekBar.value = audio.currentTime;
    seekBar.max = audio.duration;
    currentEl.textContent = formatTime(audio.currentTime);
}

function seekAudio(value) {
    audio.currentTime = value;
}

function formatTime(sec) {
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// ---- Quotes ----
const quotes = [
    "Love is composed of a single soul inhabiting two bodies. – Aristotle",
    "You are my today and all of my tomorrows. – Leo Christopher",
    "I have found the one whom my soul loves. – Song of Solomon 3:4",
    "Every love story is beautiful, but ours is my favorite."
];

let quoteIndex = 0;
function initQuotes() {
    document.getElementById("quote").textContent = quotes[quoteIndex];
}
function nextQuote() {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    document.getElementById("quote").textContent = quotes[quoteIndex];
}

// ---- Jokes ----
const jokes = [
    "Why did the computer go to therapy? Because it had too many bytes of sadness.",
    "Why don’t skeletons ever fight each other? They don’t have the guts.",
    "I told my wife she should embrace her mistakes… She gave me a hug."
];

function tellJoke() {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    alert(jokes[randomIndex]);
}

// ---- Init Everything on Page Load ----
window.onload = function () {
    guard();        // Password protection
    initPlayer();   // Music Player
    initQuotes();   // Quotes
};
 


