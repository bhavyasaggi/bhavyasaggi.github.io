---
title: Web Accessibility & Internationalization
eleventyNavigation:
  parent: /pages/frontend/
  order: 12
---

# Web Accessibility & Internationalization

## Accessability Guidelines

Basic guidelines

- Use the right HTML element for the job eg. headings, paragraphs, lists, etc
- Use Semantic Tags for layout eg. header, footer, main, nav, aside, etc.
- Attach element descriptions on images, links, and forms.\
  This can be achieved by applying `alt` attribute to images, `title` attribute on link tags, and attaching `<label>` tag to form elements.
- Using native keyboard accessibility eg. providing `role`, or `tabIndex` attribute.

Also, do check if the problem is solved by using existing HTML tags before implmenting a CSS/JS solution. For exmaple,

- `detail-summary` can be used to mimic an accordion.
- `progress-meter` can be used to show a progress bar.
- `em-strong-mark` can be used to indicate importance of text.
- MathML for mathematical equations.

You may use <https://validator.w3.org/nu/> to validate HTML markup.

## WAI-ARIA

"Web Accessibility Initiative - Accessible Rich Internet Applications" allows a set of additional HTML attributes to provide semantics and accessibility, wherever it is lacking. These are broadly categorized into:

- **Roles** define what an element is or does eg. navigation (`<nav>`), complementary (`<aside>`), banner, search, tablist, tabpanel, button, etc.
- **Properties** give extra meaning or semantics to elements eg. aria-required, aria-label, aria-labelledby, etc.
- **States** define the current conditions of elements eg aria-disabled, etc.

You may grab accessible boilerplate elements from: <https://dequeuniversity.com/library/>

Read more: <https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques>

## Internationalization Tags
