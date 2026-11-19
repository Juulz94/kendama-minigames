# Kendama Minigames (test version)

Kendama games for solo or with friends: **Dare**, **Game of KEN**, **Speed Ladder**, **Survival** and **Race to Lace**, with the trick lists of the Kendama World Cup (KWC).

This is an early test version for feedback. It is an unofficial fan project and is not affiliated with the Kendama World Cup (KWC).

**Open the app:** https://juulz94.github.io/kendama-minigames/

On a phone you can add it to your home screen (iPhone: Share, then "Add to Home Screen"; Android: browser menu, then "Install app" or "Add to Home screen"). It also works offline after the first visit.

**Feedback:** use the "Send feedback" link at the bottom of the app.

## About the app

- Everything runs in your browser. The app only stores your name, turned-off tricks and dare stats on your own device. There are no accounts and no records are saved.
- A trick request sends what you fill in (including the optional Instagram handle) to a Google Form.
- The app is in English and uses the KWC spelling for trick names.

## For developers

Plain HTML, CSS and JavaScript, no build step:

- `index.html`: the app and all game logic
- `tricks.js`: trick lists, rules for names and the glossary
- `sw.js`: service worker for offline use (the version comes from `APP_VERSION` in `index.html`)
- `manifest.webmanifest`, icons: home screen install

Raise `APP_VERSION` in `index.html` with every release so that the offline cache refreshes.
