// ---- Password gating with SHA-256 check ----
const STORE_KEY = "aby_auth";
const PASS_HASH = (typeof window !== "undefined" && window.ZOOTOPIA_PASSWORD_HASH) || "";

async function sha256(text) {
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function guard() {
  // Redirect to password if not authenticated
  try {
    const ok = sessionStorage.getItem(STORE_KEY) === PASS_HASH;
    if (!ok) window.location.replace("password.html");
  } catch (_) {
    window.location.replace("password.html");
  }
}

function logout() {
  sessionStorage.removeItem(STORE_KEY);
  window.location.href = "password.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pw-form");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("password");
    const error = document.getElementById("error");
    const val = input.value;
    const h = await sha256(val);
    if (h === PASS_HASH) {
      sessionStorage.setItem(STORE_KEY, PASS_HASH);
      window.location.href = "index.html";
    } else {
      error.textContent = "Hmm… that doesn’t seem right, Carrots 🥕";
      input.value = "";
      input.focus();
    }
  });
});

// ---- Rotating quotes ----
const QUOTES = [
  "Exams are like sloths in the DMV — slow, but they do move. Keep going, Aby!",
  "Don’t let exams hustle you — hustle them back.",
  "Like Judy Hopps: “I don’t know when to quit.” Same energy, gentler pace.",
  "Breathe. Read. Smile. Answer. Repeat. (Even Flash can do it.)",
  "You’re not alone — this page is your little HQ. Proud of you for showing up.",
  "KCSE is temporary. Your kindness and grit? Permanent.",
  "Confidence tip: shoulders back, jaw relaxed, read twice, answer once.",
  "If a fox and a bunny can be besties, you can be besties with Physics for one week."
];
let quoteIndex = 0;
function initQuotes() {
  const q = document.getElementById("quote");
  if (!q) return;
  q.textContent = QUOTES[quoteIndex % QUOTES.length];
  setInterval(() => {
    quoteIndex = (quoteIndex + 1) % QUOTES.length;
    q.textContent = QUOTES[quoteIndex];
  }, 6000);
}
function nextQuote() {
  quoteIndex = (quoteIndex + 1) % QUOTES.length;
  const q = document.getElementById("quote");
  if (q) q.textContent = QUOTES[quoteIndex];
}

// ---- Random jokes ----
const JOKES = [
  "Why did the bunny take a study break? To carrot on later.",
  "A sloth finished his exam! …in 2027. You’ll beat him by miles.",
  "Fox to bunny: “Let’s ace this.” Bunny: “No tricks, just tips.”",
  "What do owls say during exams? “Owl help myself to full marks.”",
  "Giraffe advice: keep your head high — it’s literally what we do."
];
function tellJoke() {
  const j = document.getElementById("joke");
  const pick = JOKES[Math.floor(Math.random() * JOKES.length)];
  if (j) j.textContent = pick;
}

// ---- Simple audio playlist (royalty-free placeholders) ----
const PLAYLIST = [
  { title: "Lo‑Fi Study Flow", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Calm Focus Beat", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Upbeat Confidence", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
];
let track = 0;
let audioEl, titleEl, playBtn, seekEl, currentEl, durationEl, seekTimer;

function initPlayer() {
  audioEl = document.getElementById("audio");
  titleEl = document.getElementById("track-title");
  playBtn = document.getElementById("play-btn");
  seekEl = document.getElementById("seek");
  currentEl = document.getElementById("current");
  durationEl = document.getElementById("duration");

  if (!audioEl) return;

  audioEl.addEventListener("loadedmetadata", updateDur);
  audioEl.addEventListener("timeupdate", updateSeek);
  audioEl.addEventListener("ended", nextTrack);

  loadTrack(track);
}

function loadTrack(i) {
  track = (i + PLAYLIST.length) % PLAYLIST.length;
  const item = PLAYLIST[track];
  if (titleEl) titleEl.textContent = "Now playing: " + item.title;
  audioEl.src = item.url;
  audioEl.play().then(() => {
    if (playBtn) playBtn.textContent = "⏸";
  }).catch(() => {
    if (playBtn) playBtn.textContent = "▶";
  });
}

function togglePlay() {
  if (!audioEl) return;
  if (audioEl.paused) {
    audioEl.play();
    if (playBtn) playBtn.textContent = "⏸";
  } else {
    audioEl.pause();
    if (playBtn) playBtn.textContent = "▶";
  }
}

function nextTrack() { loadTrack(track + 1); }
function prevTrack() { loadTrack(track - 1); }

function updateDur() {
  if (!audioEl || !durationEl) return;
  durationEl.textContent = fmt(audioEl.duration);
}

function updateSeek() {
  if (!audioEl || !seekEl || !currentEl) return;
  const p = (audioEl.currentTime / audioEl.duration) * 100 || 0;
  seekEl.value = String(Math.floor(p));
  currentEl.textContent = fmt(audioEl.currentTime);
}

function seekAudio(val) {
  if (!audioEl) return;
  const pct = Number(val) / 100;
  audioEl.currentTime = pct * (audioEl.duration || 0);
}

function fmt(sec) {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return m + ":" + String(s).padStart(2, "0");
}
