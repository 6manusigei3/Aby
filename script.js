// ---- Password Guard ----
function guard() {
  const saved = localStorage.getItem("zootopia_auth");
  if (saved !== window.ZOOTOPIA_PASSWORD_HASH) {
    window.location.href = "login.html";
  }
}
function logout() {
  localStorage.removeItem("zootopia_auth");
  window.location.href = "login.html";
}

// ---- Music Player ----
const tracks = [
  { title: "Those Eyes - New West", src: "music/those_eyes.mp3" },
  { title: "Car's Outside - James Arthur", src: "music/cars_outside.mp3" },
  { title: "A Sky Full of Stars - Coldplay", src: "music/a_sky_full_of_stars.mp3" },
  { title: "Fast Car - Jonas Blue ft. Dakota", src: "music/fast_car.mp3" }
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
  const track = tracks[index];
  audio.src = track.src;
  titleEl.textContent = track.title;
  audio.load();
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
  const progress = (audio.currentTime / audio.duration) * 100;
  seekBar.value = progress || 0;
  currentEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
}

function seekAudio(value) {
  audio.currentTime = (value / 100) * audio.duration;
}

function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ---- Quotes ----
const quotes = [
  "Don’t let the hustle make you forget your worth. 🌟",
  "One paw forward is still progress. 🐾",
  "The tallest trees start as tiny seeds. 🌱",
  "Courage doesn’t always roar — sometimes it whispers. 🦁"
];

function initQuotes() {
  nextQuote();
}

function nextQuote() {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").textContent = q;
}

// ---- Jokes ----
const jokes = [
  "Why don’t elephants use computers? They’re afraid of the mouse. 🐭",
  "What do you call an alligator in a vest? An investigator. 🐊",
  "Why can’t leopards hide? Because they’re always spotted. 🐆"
];

function tellJoke() {
  const j = jokes[Math.floor(Math.random() * jokes.length)];
  document.getElementById("joke").textContent = j;
}
