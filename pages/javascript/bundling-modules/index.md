---
layout: base.liquid
title: Bundling & Modules
eleventyNavigation:
  key: /javascript/bundling-modules/
  parent: /javascript/
  order: 4
---

**Read More**: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules>

In the beginning, Javascript did not have a way to import/export modules. Eventually modularity was introducted to organize and structure the code better. Some of which are:

- **ESM** (ES Modules)

  Introduced in ES6, ESM is a static module structure, meaning you can statically analyze the imports and exports without running the code.\
  It is Tree-shakeable, and allows bundlers like Rollup to remove unnecessary code.

  ```js
  // Named exports
  export const PI = 3.14159;
  export function calculateArea(radius) {
    return PI * radius * radius;
  }
  // Dynamic imports
  const { PI, calculateArea } = await import("./math.js");
  ```

- **CJS** (CommonJS)

  CJS imports module synchronously, and provides a copy of the imported object. Primarily used for Backend (NodeJS) environments.

  ```js
  // Exports
  module.exports = {
    PI: 3.14159,
    calculateArea: function (radius) {
      return this.PI * radius * radius;
    },
  };
  // Imports
  const { PI, calculateArea } = require("./math");
  ```

- **AMD** (Asynchronous Module Definition)

  AMD imports modules asynchronously. Primarily used in Frontend (Browser) environments.

  ```js
  // Define module
  define(["jquery", "underscore"], function ($, _) {
    return {
      doSomething: function () {
        // Use $ and _ here
      },
    };
  });
  // Require module
  require(["myModule"], function (myModule) {
    myModule.doSomething();
  });
  ```

- **UMD** (Universal Module Definition)

  UMD is more like a pattern to configure several module systems, and is used as a fallback module when using bundler like Rollup.

  ```js
  (function (root, factory) {
    if (typeof define === "function" && define.amd) {
      // AMD
      define(["jquery"], factory);
    } else if (typeof module === "object" && module.exports) {
      // CommonJS
      module.exports = factory(require("jquery"));
    } else {
      // Browser globals
      root.MyLibrary = factory(root.jQuery);
    }
  })(typeof self !== "undefined" ? self : this, function ($) {
    return {
      doSomething: function () {
        // Library code
      },
    };
  });
  ```

## Build Tools

- Webpack
- Vite
- Rollup
- Parcel

## Bundle Performance

- _Dynamic Imports_

  ```js
  // Route-based splitting
  const Home = lazy(() => import("./pages/Home"));
  const About = lazy(() => import("./pages/About"));

  // Feature-based splitting
  const loadChart = async () => {
    const { Chart } = await import("./components/Chart");
    return Chart;
  };
  ```

- _Webpack Magic Comments_

  ```js
  const LazyComponent = lazy(() =>
    import(/* webpackChunkName: "lazy-component" */ "./LazyComponent")
  );

  const PreloadedComponent = lazy(() =>
    import(/* webpackPreload: true */ "./PreloadedComponent")
  );
  ```

- _ES Modules for Tree Shaking_

  ```js
  // utils.js - Export individual functions
  export function add(a, b) {
    return a + b;
  }
  export function subtract(a, b) {
    return a - b;
  }

  // main.js - Import only what you need
  import { add } from "./utils.js"; // subtract won't be bundled
  ```
