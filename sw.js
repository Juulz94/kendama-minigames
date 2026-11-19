// Service worker: de app werkt ook zonder internet.
// De versie komt uit de registratie-URL (sw.js?v=APP_VERSION in index.html), dus je hoeft hem maar op één plek te veranderen.
// Strategie: eerst het netwerk (zodat testers na een nieuwe upload meteen de nieuwe versie krijgen),
// bij geen verbinding de opgeslagen kopie. Oude caches worden opgeruimd zodra een nieuwe versie actief wordt.
const VERSION = new URL(self.location.href).searchParams.get("v") || "dev";
const CACHE = "kendama-" + VERSION;
const FILES = ["./", "index.html", "tricks.js", "manifest.webmanifest", "icon.svg", "icon-180.png", "icon-192.png", "icon-512.png", "og-image.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" })))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith("kendama-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  // Alleen eigen bestanden; Google Forms en YouTube gaan gewoon langs
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await fetch(req, { cache: "no-cache" });
      if (res.ok) cache.put(req, res.clone());
      return res;
    } catch {
      const hit = await cache.match(req, { ignoreSearch: true }) || (req.mode === "navigate" ? await cache.match("index.html") : null);
      return hit || Response.error();
    }
  })());
});
