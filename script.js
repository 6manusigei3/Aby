// ===== PASSWORD PROTECTION =====
async function guard() {
  const stored = localStorage.getItem("zootopia_login");
  if (stored === window.ZOOTOPIA_PASSWORD_HASH) {
    return; // already unlocked
  }

  let pass = prompt("🔒 Enter password to unlock Aby's Zootopia HQ:");
  if (!pass) {
    document.body.innerHTML = "<h2 style='text-align:center;margin-top:40px'>Access denied </h2>";
    return;
  }

  // hash input
  const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pass));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  if (hashHex === window.ZOOTOPIA_PASSWORD_HASH) {
    localStorage.setItem("zootopia_login", hashHex);
  } else {
    alert("❌ Wrong password!");
    location.reload();
  }
}

function logout() {
  localStorage.removeItem("zootopia_login");
  location.reload();
}

// ===== QUOTES =====
const quotes = [
  "🌱 One step at a time, and you’ll get there.",
  "🐾 Even the smallest paws can leave the biggest prints.",
  "✨ You are stronger than the storm.",
  "🦋 Every day is a new chance to bloom.",
  "💪 Keep going — future you is already proud."
];
let quoteIndex = 0;

function initQuotes() {
  document.getElementById("quote").innerText = quotes[quoteIndex];
}
function nextQuote() {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  document.getElementById("quote").innerText = quotes[quoteIndex];
}

// ===== JOKES =====
const jokes = [
  "Why don’t rabbits ever get hot in the summer? Because they have hare-conditioning!",
  "What do you call an alligator in a vest? An investigator!",
  "Why did the fox sit under the tree? To paws for a bit.",
  "Why don’t koalas count as bears? Because they don’t have the koalafications!"
];

function tellJoke() {
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  document.getElementById("joke").innerText = joke;
}

// ===== MUSIC PLAYER =====
const playlist = [
  { title: "Those Eyes - New West", file: "music/Those_Eyes.mp3" },
  { title: "Sky Full of Stars - Coldplay", file: "music/Sky_Full_of_Stars.mp3" },
  { title: "Perfect - Ed Sheeran", file: "music/Perfect.mp3" }
];

let currentTrack = 0;
let audio, playBtn, seekSlider, currentTimeLabel, durationLabel;

function initPlayer() {
  audio = document.getElementById("audio");
  playBtn = document.getElementById("play-btn");
  seekSlider = document.getElementById("seek");
  currentTimeLabel = document.getElementById("current");
  durationLabel = document.getElementById("duration");

  loadTrack(currentTrack);

  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("ended", nextTrack);
}

function loadTrack(index) {
  currentTrack = index;
  document.getElementById("track-title").innerText = playlist[index].title;
  document.getElementById("audio-source").src = playlist[index].file;
  audio.load();
  playBtn.innerText = "▶";
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
  } else {
    audio.pause();
    playBtn.innerText = "▶";
  }
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  audio.play();
  playBtn.innerText = "⏸";
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
  audio.play();
  playBtn.innerText = "⏸";
}

function updateProgress() {
  if (!isNaN(audio.duration)) {
    seekSlider.value = (audio.currentTime / audio.duration) * 100;
    currentTimeLabel.innerText = formatTime(audio.currentTime);
    durationLabel.innerText = formatTime(audio.duration);
  }
}

function seekAudio(value) {
  if (!isNaN(audio.duration)) {
    audio.currentTime = (value / 100) * audio.duration;
  }
}

function formatTime(sec) {
  let minutes = Math.floor(sec / 60);
  let seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}





