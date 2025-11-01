---
layout: base.liquid
title: JavaScript
eleventyNavigation:
  key: /javascript/
  order: 1
  excerpt: Core language concepts, ES6+, async programming
---

- **Closures**: Functions that retain access to outer scope variables.

  ```js
  function outer(x) {
    return function inner(y) {
      return x + y; // x is captured
    };
  }
  ```

- **Currying**: Transforming multi-argument function into sequence of single-argument functions.

  ```js
  const add = (a) => (b) => a + b;
  const add5 = add(5);
  add5(3); // 8
  ```

- **Object Methods**: Some Object static methods

  ```js
  // Property descriptors
  Object.defineProperty(obj, "prop", {
    value: 42,
    writable: false,
    enumerable: true,
    configurable: true,
  });

  // Useful methods
  Object.keys(obj); // enumerable own properties
  Object.values(obj); // values of enumerable properties
  Object.entries(obj); // [key, value] pairs
  Object.assign(target, ...sources); // shallow copy
  Object.freeze(obj); // immutable
  Object.seal(obj); // no add/delete properties
  ```

- **Symbols**: Unique identifiers for object properties.

  ```js
  const sym = Symbol("description");
  const obj = { [sym]: "value" };

  // Well-known symbols
  Symbol.iterator; // for...of loops
  Symbol.asyncIterator; // for await...of
  Symbol.toPrimitive; // type conversion
  ```

- **Generators / Iterators**:

  - Iterator is an object which defines a sequence and potentially a return value upon its termination.

    ```js
    let result = iter.next();
    while (!result.done) {
      console.log(result.value); // 1 3 5 7 9
      result = iter.next();
    }
    ```

  - Generators return a function whose execution is not continuous, and executes until it encounters the yield keyword.

    ```js
    function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
      let iterationCount = 0;
      for (let i = start; i < end; i += step) {
        iterationCount++;
        yield i;
      }
      return iterationCount;
    }
    ```

## Common Patterns

- **Module Pattern**

  ```js
  const Module = (function () {
    let private = 0;
    return {
      increment: () => ++private,
      getCount: () => private,
    };
  })();
  ```

- **Singleton Pattern**

```js

```

- **Observer Pattern**

  ```js
  class EventEmitter {
    constructor() {
      this.events = {};
    }
    on(event, callback) {
      (this.events[event] ||= []).push(callback);
    }
    emit(event, data) {
      this.events[event]?.forEach((cb) => cb(data));
    }
  }
  ```

## Essential Links

- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [JavaScript.info](https://javascript.info/)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
- [ECMAScript Proposals](https://github.com/tc39/proposals)
