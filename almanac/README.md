# Almanac

Commit your knowledge

## Aliases / Swizzling

- `@site`
- `@theme`
  - `/src/theme`
  - Docusaurus theme package
- `@theme-original`
  - Component from the initial theme
- `@theme-init`
  - Topmost non-swizzled component

```code
+-------------------------------------------------+
|        `website/src/theme/CodeBlock.js`         | <-- `@theme/CodeBlock` always points to the top
+-------------------------------------------------+
| `theme-live-codeblock/theme/CodeBlock/index.js` | <-- `@theme-original/CodeBlock` points to the topmost non-swizzled component
+-------------------------------------------------+
|  `plugin-awesome-codeblock/theme/CodeBlock.js`  |
+-------------------------------------------------+
|     `theme-classic/theme/CodeBlock/index.js`    | <-- `@theme-init/CodeBlock` always points to the bottom
+-------------------------------------------------+
```

## Client Modules

<https://docusaurus.io/docs/advanced/client#client-modules>

- `@docusaurus/Link`
- `@docusaurus/useDocusaurusContext`
- `@docusaurus/utils`
- `@docusaurus/types`
- `@docusaurus/plugin-content-docs`
