---
layout: base.liquid
title: UI Loading Patterns
eleventyNavigation:
  key: /frontend/ui-loading-patterns/
  parent: /frontend/
  order: 4
---

How and when content is loaded is important. The approaches can broadly classified under

- **Static Import**: Everything is bundled & served together.
- **Dynamic Import**: Bundles are segmented and served only when needed. They are preceeded by placeholders which hydrate later.
  - _Import on visibility_: Bundles are served when they in/near the viewport.
  - _Import on interaction_: Bundle are served on user action, eg. button click to expand a section.

A few advanced paradigms could be adopted to provided further breakdown on resource timeline.

- **PRPL**
  - _Pushing_ critical resources efficiently to minimize roundtrips to the server.
  - _Rendering_ the initial route soon as possible.
  - _Pre-caching_ assets in the background.
  - _Lazily loading_ routes or assets that aren’t requested as frequently.
- **Islands Architecture**: The static regions of the page are pure non-interactive HTML and do not need hydration. The dynamic regions are a combination of HTML and scripts capable of rehydrating themselves after rendering.
  - Unlike _Progressive Hydration_ where the hydration architecture of the page is top-down, each component has its hydration script in the Islands architecture that executes asynchronously, independent of any other script on the page.

Read More:

- <https://www.patterns.dev/>
- <https://quick-teaching-tool.web.app/>

## Data Loading

- [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest): XHR objects are used retrieve data without having to do a full page refresh.
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch): Fetch is promise-based modern replacement for XMLHttpRequest.

## Data Sharing

- [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies): Cookies is data saved by server on browser to support stateful behaviour.
- [SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage): SessionStorage is saved as keys and values, partitioned by both origin and browser tabs.
- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage): LocalStorage data is saved as keys and the values in the UTF-16 string format, and has no expiration time.\
  LocalStorage data is specific to the protocol of the document, and is available across browser instances or tabs.
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API): A NoSQL storage system
- Memory:
  - [Blob Url](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/blob): Can be generated and must revoked revoked via `createObjectURL` and `revokeObjectURL`.
  - [Data Url](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data): Allows embedding small files inline in documents.

> Browsers can store up to 5 MiB of local storage, and 5 MiB of session storage per origin.
