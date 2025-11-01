---
layout: base.liquid
title: Web Vitals & Performance
eleventyNavigation:
  key: /frontend/web-vitals-performance/
  parent: /frontend/
  order: 2
  excerpt: Web vitals, performance measurement
---

Popular metrics measuring many of the various aspects of performance relevant to users:

- **First Contentful Paint** (FCP): measures the time from when the page starts loading to when any part of the page's content is rendered on the screen. (_lab, field_)
- **Largest Contentful Paint** (LCP): measures the time from when the page starts loading to when the largest text block or image element is rendered on the screen. (_lab, field_)
- **First Input Delay** (FID): measures the time from when a user first interacts with your site (when they click a link, tap a button, or use a custom, JavaScript-powered control) to the time when the browser is actually able to respond to that interaction. (_field_)
- **Interaction to Next Paint** (INP): measures the latency of every tap, click, or keyboard interaction made with the page, and—based on the number of interactions—selects the worst interaction latency of the page (or close to the highest) as a single, representative value to describe a page's overall responsiveness. (_lab, field_)
- **Time to Interactiv**e (TTI): measures the time from when the page starts loading to when it's visually rendered, its initial scripts (if any) have loaded, and it's capable of reliably responding to user input quickly. (_lab_)
- **Total Blocking Time** (TBT): measures the total amount of time between FCP and TTI where the main thread was blocked for long enough to prevent input responsiveness. (_lab_)
- **Cumulative Layout Shift** (CLS): measures the cumulative score of all unexpected layout shifts that occur between when the page starts loading and when its lifecycle state changes to hidden. (_lab, field_)
- **Time to First Byte** (TTFB): measures the time it takes for the network to respond to a user request with the first byte of a resource. (_lab, field_)

Each Core Web Vitals metric has associated thresholds, which categorize performance as either "good", "needs improvement", or "poor":

|                           | Good    | Poor    | Percentile |
| ------------------------- | ------- | ------- | ---------- |
| Largest Contentful Paint  | <2500ms | >4000ms | 75         |
| Interaction to Next Paint | <200ms  | >500ms  | 75         |
| Cumulative Layout Shift   | <0.1    | >0.25   | 75         |

> **Note**: Browser dev-tools can be used to identify and fix these issues via Lighthouse report.

## Web Performance

There are several other types of metrics that are relevant to how users perceive performance.

- **Perceived load speed**: how quickly a page can load and render all of its visual elements to the screen.
- **Load responsiveness**: how quickly a page can load and execute any required JavaScript code in order for components to respond quickly to user interaction
- **Runtime responsiveness**: after page load, how quickly can the page respond to user interaction.
- **Visual stability**: do elements on the page shift in ways that users don't expect and potentially interfere with their interactions?
- **Smoothness**: do transitions and animations render at a consistent frame rate and flow fluidly from one state to the next?

To address such cases, the Web Performance Working Group has also standardized lower-level APIs that can be useful for implementing your own custom metrics:

- Performance Observer API
- User Timing API
- Long Tasks API
- Element Timing API
- Event Timing API
- Resource Timing API
- Navigation Timing API
- Server Timing API

Read More: <https://web.dev/articles/custom-metrics>
