---
title: Workers
layout: base.liquid
eleventyNavigation:
  key: /frontend/workers/
  parent: /frontend/
  order: 1
---

## Web Workers

Write your own web-worker to assist with CPU intensive tasks, and may use following libraries to assist:

- [comlink](https://github.com/GoogleChromeLabs/comlink): An easier API over `postMessage` for brower to web-worker communication.
- [partytown](https://github.com/QwikDev/partytown): Runs resource intensive scripts into a web worker.

Example:

```js
// main.js
const worker = new Worker("worker.js");
worker.postMessage({ data: largeArray });
worker.onmessage = (e) => console.log("Result:", e.data);
// worker.js
self.onmessage = (e) => {
  const result = heavyComputation(e.data.data);
  self.postMessage(result);
};
```

Read more: <https://web.dev/articles/workers-overview>

## Service Workers

Write your own service-worker, or generate a using a libraries such as:

- [MSW](https://mswjs.io/): Mock Service Worker is an API mocking library for browser and Node.js.
- [Serwist](https://github.com/serwist/serwist): Serwist is a collection of JavaScript libraries for progressive web apps.\
  It is a fork of [Workbox](https://github.com/GoogleChrome/workbox) that came to be due to the its development being stagnated.

Example:

```js
// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

// sw.js - Cache strategies
self.addEventListener("fetch", (event) => {
  if (event.request.destination === "image") {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => response || fetch(event.request))
    );
  }
});
```

### PWA

With inclusion of a webmanifest and service-worker, an application becomes eligible for PWA.\
But there are few other checklist items it needs to cover before it is 'installable'.

- The web app is not already installed
- The user needs to have clicked or tapped on the page at least once.
- The user needs to have spent at least 30 seconds viewing the page.
- Be served over HTTPS
- Includes a 'webmanifest' that includes:
  - `short_name` or `name`
  - `icons`:
    - Must include a 192px and a 512px icon
    - Should include a ["maskable icon"](https://web.dev/articles/maskable-icon).
  - `start_url`
  - `display`: must be one of fullscreen, standalone, minimal-ui, or window-controls-overlay
  - `prefer_related_applications` must not be present, or be false
  - `screenshots`:
    - with 'form_factor' set to "wide" and not-"wide".
    - Width and height must be at least 320px and at most 3,840px.
    - The maximum dimension can't be more than 2.3 times as long as the minimum dimension.
    - All screenshots with the same form factor value must have identical aspect ratios.
    - Only JPEG and PNG image formats are supported.
  - `description`: Should provide 7 lines of text (roughly 324 characters).
  - `display_override`: Should be present if `display` mode is provided as a fallback.

Instead of a browser provided installation prompt, a webapp can provide custom interface by hijacking `beforeinstallprompt` event. Read more: <https://web.dev/learn/pwa/installation-prompt>

> Read More: <https://web.dev/explore/progressive-web-apps>
