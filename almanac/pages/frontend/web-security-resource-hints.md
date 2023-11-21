---
title: Web Security & Resource Hints
eleventyNavigation:
  parent: /pages/frontend/
  order: 11
---

# Web Security

A good rule for web security is _"You can never be too cautious. If you made it, double-check it anyway. If someone else made it, assume it's dangerous until proven otherwise."_

Type of Attacks

- Click-Jacking
- Session hijacking
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF / XSRF)

_Read More: <https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks>_

## Iframe Security

- **Use HTTPS** to reduce chances of content tampering during transit, and to prevent embedded content from accessing parent document, and vice versa.
- **Use `sandbox` attribute** gives embedded content only the permissions needed. Never add both `allow-scripts` and `allow-same-origin` to sandbox attribute.
- **Send `X-Frame-Options` header** to prevent other websites from embedding your content.\
  _Read More: <https://blog.mozilla.org/security/2013/12/12/on-the-x-frame-options-security-header/>_

## CSP

Content Security Policy provides a set of HTTP Headers that allows website administrators to control resources the user agent is allowed to load for a given page.

```text
Content-Security-Policy: <directive> <value> <host>;
Content-Security-Policy: default-src 'self' http://example.com;
                         connect-src 'none';
```

Read more: <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy>

## CSRF

## CORS

# Resource Hints
