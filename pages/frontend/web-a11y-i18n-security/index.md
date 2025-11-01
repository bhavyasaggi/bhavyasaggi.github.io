---
layout: base.liquid
title: Web Accessibility, Internationalization, and Security
eleventyNavigation:
  key: /frontend/web-a11y-i18n-security/
  parent: /frontend/
  order: 1
---

- Use the right (semantic) HTML element for the job eg. headings, lists, etc.\
  - `header-footer-main-nav-aside` can be used for layout.
  - `detail-summary` can be used to mimic an accordion.
  - `progress-meter` can be used to show a progress bar.
  - `em-strong-mark` can be used to indicate importance of text.
  - _MathML_ for mathematical equations.
- Descriptions on elements, eg. `alt` attribute on images, `title` attribute on link tags, and `<label>` tag to form elements.
- Using native keyboard accessibility eg. providing `role`, or `tabIndex` attribute.
- Consider UI design fundamentals:
  - _Contrast_:\
    Contrast ratio of 4.5:1 for normal text (less than 18 point or 14 point bold.)\
    Contrast ratio of 3:1 for large text (at least 18 point or 14 point bold.)
  - _Visual Hierarchy_:\
    Headings must not break hierarchical structure.

You may use <https://validator.w3.org/nu/> to validate HTML markup.

### WAI-ARIA

"Web Accessibility Initiative - Accessible Rich Internet Applications" [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques) allows a set of additional HTML attributes to provide semantics and accessibility, wherever it is lacking. These are broadly categorized into:

- **Roles** define what an element is or does eg. navigation (`<nav>`), complementary (`<aside>`), banner, search, tablist, tabpanel, button, etc.
- **Properties** give extra meaning or semantics to elements eg. aria-required, aria-label, aria-labelledby, etc.
- **States** define the current conditions of elements eg aria-disabled, etc.

Example:

```html
<!-- Semantic HTML first -->
<button aria-label="Close dialog" aria-expanded="false">
  <span aria-hidden="true">&times;</span>
</button>

<!-- Live regions -->
<div aria-live="polite" id="status"></div>
<div aria-live="assertive" id="errors"></div>

<!-- Landmarks -->
<nav aria-label="Main navigation">
  <main aria-labelledby="main-heading">
    <aside aria-label="Related links"></aside>
  </main>
</nav>
```

### Keyboard Navigation

```js
// Focus management
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  });
}
```

## Internationalization / Localization

Web is global, so ideally anything on web should easily be adapted for different regions, or languages.

- Webpage Localization using `lang` attribute.

  ```html
  <!DOCTYPE html>
  <html lang="en"></html>
  ```

- Alternate Localized webpages via meta-hreflang tag.

  ```html
  <link hreflang="en" href="https://pdfvise.com" rel="alternate" />
  ```

Read more:

- <https://developer.mozilla.org/en-US/docs/Glossary/Internationalization>
- <https://developer.mozilla.org/en-US/docs/Glossary/Localization>

## Web Security

- **Type of Attacks**: [MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks)

  - _Click-Jacking_: Set the `SameSite` cookie attribute for session cookies to 'Lax' or 'Strict'.
  - _Session hijacking_: Encrypted network data & use a session key.
  - _Cross-site scripting (XSS)_: Always Sanitize user input.\
    Content Security Policy (CSP) [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) provides a set of HTTP Headers that allows website administrators to control resources the user agent is allowed to load for a given page.

    ```html
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'unsafe-inline'"
    />
    ```

    Or

    ```text
    Content-Security-Policy: &lt;directive&gt; &lt;value&gt; &lt;host&gt;;
    Content-Security-Policy: default-src 'self' http://example.com; connect-src 'none';
    ```

  - _Cross-site request forgery (CSRF / XSRF)_: Include CSRF token in requests.

    ```js
    // Include CSRF token in requests
    fetch("/api/data", {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify(data),
    });
    ```

### Iframe Security

- **Use HTTPS** to reduce chances of content tampering during transit, and to prevent embedded content from accessing parent document, and vice versa.
- **Use `sandbox` attribute** gives embedded content only the permissions needed. Never add both `allow-scripts` and `allow-same-origin` to sandbox attribute.
- **Send `X-Frame-Options` header** to prevent other websites from embedding your content.\
  _Read More: <https://blog.mozilla.org/security/2013/12/12/on-the-x-frame-options-security-header/>_

### CORS

A bane of all web-devs, a boon to all web-surfers.

Read more: <https://jakearchibald.com/2021/cors/>
