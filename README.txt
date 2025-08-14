Aby’s Zootopia — Private Site

This is a small, static website designed for Aby with a Zootopia vibe.
It includes a password gate, a music player with royalty‑free placeholder tracks,
auto‑rotating quotes, and a tiny joke generator.

---
🔐 Password
- Password: #Aby@123
- The check is done with a SHA‑256 hash in the browser (no server).
- Files:
  - password.html — the entry page
  - script.js — contains the logic for hashing and login
  - index.html — the protected main page
- If someone goes directly to index.html without logging in, it redirects back.

💡 How to publish on GitHub Pages
1) Create a new public repo, e.g. `aby-zootopia-site`.
2) Upload all files and folders in this ZIP (don’t upload the ZIP itself).
3) In the repo, open Settings → Pages → Set Branch to `main` (or `master`) and Folder to `/ (root)` → Save.
4) Wait a minute. Your site will be available at:
   https://<your-username>.github.io/aby-zootopia-site/

🎵 Music (on‑site playback)
- The built‑in player uses royalty‑free placeholder tracks hosted by SoundHelix.
- You can replace them in `script.js` by editing the PLAYLIST array:
  PLAYLIST = [
    { title: "Song name", url: "https://example.com/your-track.mp3" },
    ...
  ]

🐾 “Try Everything” on the page
- The main page also includes an *embedded* YouTube player for the Zootopia song “Try Everything” that plays inside the page.
- If the video ever breaks, replace the `src` video ID in the iframe URL in `index.html`.

🎨 Customize
- Colors and layout: edit `style.css`.
- Quotes and jokes: edit arrays in `script.js`.
- Text content: edit `index.html` and `password.html`.

🛡️ Note on privacy
- This is a static site. The password is checked in the browser and obfuscated via hashing.
- Don’t use this pattern to protect sensitive data; it’s only for a personal, private corner.

Made with kindness for Aby. 🧡
