---
layout: base.liquid
title: Proxy & Reflect
eleventyNavigation:
  key: /javascript/proxy-reflect/
  parent: /javascript/
  order: 2
---

## Proxy Fundamentals

Proxy allows you to intercept and customize operations performed on objects (property lookup, assignment, enumeration, function invocation, etc).

Example:

```js
const user = {
  public: "visible",
  _private: "hidden",
  name: "John",
  age: 30,
};

const userProxy = new Proxy(user, {
  get(target, property, receiver) {
    console.log(`Getting ${property}`);

    if (property in target) {
      return target[property];
    } else {
      throw new Error(`Property ${property} does not exist`);
    }
  },
  set(target, property, value, receiver) {
    if (property === "age" && typeof value !== "number") {
      throw new TypeError("Age must be a number");
    }

    if (property === "email" && !value.includes("@")) {
      throw new TypeError("Invalid email format");
    }

    target[property] = value;
    return true; // Indicates success
  },

  has(target, property) {
    if (property.startsWith("_")) {
      return false; // Hide private properties
    }
    return property in target;
  },
});

console.log(userProxy.name); // "Getting name" -> "John"

userProxy.age = 25; // OK
userProxy.email = "john@example.com"; // OK

console.log("public" in userProxy); // true
console.log("_private" in userProxy); // false
```

### Proxy Function calls

Operations such as function calls can also be proxied via 'apply' trap.

Example:

```js
function greet(name) {
  return `Hello, ${name}!`;
}

const loggedGreet = new Proxy(greet, {
  apply(target, thisArg, argumentsList) {
    console.log(`Calling function with args: ${argumentsList}`);
    const result = target.apply(thisArg, argumentsList);
    console.log(`Function returned: ${result}`);
    return result;
  },
});

loggedGreet("John");
```

### Revocable Proxy

```js
const { proxy, revoke } = Proxy.revocable(target, handler);

// Use proxy normally
proxy.someProperty = "value";

// Revoke access
revoke();

// Any operation on proxy will throw
try {
  proxy.someProperty; // TypeError: Cannot perform 'get' on a proxy that has been revoked
} catch (e) {
  console.log("Proxy has been revoked");
}
```

## Reflect API

Reflect is not a constructor, it provides methods for interceptable JavaScript operations. These methods are the same as those of proxy handlers.
The Reflect API is used to invoke the corresponding internal method in Proxy handlers.

Example:

```js
// Good: Use Reflect for default behavior
const proxy = new Proxy(target, {
  get(target, property, receiver) {
    console.log(`Getting ${property}`);
    return Reflect.get(target, property, receiver);
  },

  set(target, property, value, receiver) {
    console.log(`Setting ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  },
});
```

## When to Use Proxies

Proxies add overhead - use judiciously for performance-critical code. Direct property access is faster than proxied access.

- **Validation**: Runtime type checking and data validation
- **Observation**: Implementing reactive systems
- **Virtualization**: Creating virtual objects or arrays
