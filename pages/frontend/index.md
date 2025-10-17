---
layout: base.liquid
title: Frontend
eleventyNavigation:
  key: /frontend/
  order: 2
  excerpt: Performance, security, accessibility, modern APIs
---

- **How Browsers Work**: [MDN](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work)

  1. _DNS Lookup_ &rarr; _TCP Connection_ &rarr; _HTTP Request_
  2. _HTML Parsing_ &rarr; _DOM Construction_
  3. _CSS Parsing_ &rarr; _CSSOM Construction_
  4. _Render Tree_ &rarr; _Layout_ &rarr; _Paint_ &rarr; _Composite_

- **Critical Rendering Path**: [MDN](https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path)

  ```mermaid
  flowchart LR
      HTML --> DOM[DOM Tree]
      CSS --> CSSOM
      DOM --> RT[Render Tree]
      CSSOM --> RT
      RT --> Layout
      Layout --> Paint
      Paint --> Composite
  ```

- **Optimization Strategies:**

  - _Minimize critical resources_ by marking them as async, or eliminating them altogether.
  - _Minimize critical path length_ by optimizing the order in which critical resources are loaded.
  - Leverage Resource Hints

    ```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="dns-prefetch" href="https://api.example.com" />
    <link rel="preload" href="critical.css" as="style" />
    <link rel="prefetch" href="next-page.html" />
    ```

  - Leverage `loading` attribute

    ```html
    <!-- Lazy loading -->
    <img src="image.jpg" loading="lazy" alt="Description" />
    <iframe src="video.html" loading="lazy"></iframe>
    ```

> Here are some essential resources:
>
> - [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
> - [Web.dev](https://web.dev/)
> - [Can I Use](https://caniuse.com/)

## Web Components

Read more: <https://developer.mozilla.org/en-US/docs/Web/API/Web_components>

```js
class CustomButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        button { background: var(--primary-color, blue); }
      </style>
      <button><slot></slot></button>
    `;
  }
}

customElements.define("custom-button", CustomButton);
```

## Browser DevTools Tips

- **Performance Profiling**

  1. _Lighthouse_: Audit performance, accessibility, SEO
  2. _Performance Tab_: Analyze runtime performance
  3. _Network Tab_: Optimize resource loading
  4. _Memory Tab_: Debug memory leaks

- **Debugging Techniques**:

  ```js
  // Console utilities
  console.table(arrayOfObjects);
  console.time("operation");
  console.timeEnd("operation");
  console.trace("execution path");

  // Breakpoints
  debugger; // Programmatic breakpoint

  // Performance marks
  performance.mark("start-operation");
  // ... operation ...
  performance.mark("end-operation");
  performance.measure("operation", "start-operation", "end-operation");
  ```

## Must know libraries

- Styling
  - Stylesheet Generators
    - bootstrap (Sass / Scss)
    - tailwind
    - vanilla-extract
  - Styled Components
    - css-modules
- Iconography
  - Sprites
  - SVG
- State Management Libraries
  - Redux
  - Zustand
  - Apollo
- Routing Libraries
  - React-Router
- Component Libraries
  - React-Bootstrap
  - Ant Design
  - MUI
  - Mantine
  - RadixUI
- Functionality Libraries
  - Formik
  - Framer Motion
  - RxJS
