---
layout: base.liquid
title: Inheritance & Prototype Chain
eleventyNavigation:
  key: /javascript/inheritance-prototype-chain/
  parent: /javascript/
  order: 1
---

JavaScript implements inheritance by using objects. Each object has an internal link to another object called its prototype.

That prototype object has a prototype of its own, and so on until an object is reached with `null` as its prototype. By definition, `null` has no prototype and acts as the final link in this prototype chain.

ES6 introduced `class` keyword but it is mere syntactic sugar atop prototypal mechanism.

Example:

```js
// Prototype chain
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  return `Hi, ${this.name}`;
};

// Class syntax (syntactic sugar)
class Developer extends Person {
  constructor(name, language) {
    super(name);
    this.language = language;
  }

  code() {
    return `Coding in ${this.language}`;
  }
}
```

## Prototype APIs

- With constructor functions

  ```js
  function Graph() {
    this.vertices = [];
    this.edges = [];
  }

  Graph.prototype.addVertex = function (v) {
    this.vertices.push(v);
  };

  const g = new Graph();
  ```

- With `Object.create()`

  ```js
  const a = { a: 1 }; // a ---> Object.prototype ---> null

  const b = Object.create(a); // b ---> a ---> Object.prototype ---> null
  console.log(b.a); // 1 (inherited)

  const c = Object.create(null); // c ---> null
  console.log(d.hasOwnProperty); // undefined, because d doesn't inherit from Object.prototype
  ```

- With `Object.setPrototypeOf()`

  ```js
  const obj = { a: 1 };
  const anotherObj = { b: 2 };
  Object.setPrototypeOf(obj, anotherObj); // obj ---> anotherObj ---> Object.prototype ---> null
  ```

## Common Pitfalls

- The prototype chain should be set during creation, as it might cause some engines to recompile code for de-optimization.
- When iterating over the properties of an object, every enumerable property that is on the prototype chain will be enumerated.
