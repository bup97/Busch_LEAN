// Service Worker: App offline verfügbar machen.
// Bei jeder Änderung an index.html die Versionsnummer erhöhen, damit iPhones das Update laden.
const VERSION = "muda-v4";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icons/apple-touch-icon.png", "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(CORE);
    self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // App-Seite: erst Netz (für Updates), sonst Cache (offline)
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      try { const r = await fetch(req); const c = await caches.open(VERSION); c.put("./index.html", r.clone()); return r; }
      catch (_) { return (await caches.match("./index.html")) || (await caches.match("./")); }
    })());
    return;
  }
  // Alles andere (Icons, Schriften): Cache zuerst, im Hintergrund auffrischen
  if (url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com/.test(url.host)) {
    e.respondWith((async () => {
      const c = await caches.open(VERSION);
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r && (r.ok || r.type === "opaque")) c.put(req, r.clone()); return r; }).catch(() => null);
      return hit || (await net) || new Response("", { status: 504 });
    })());
  }
});
