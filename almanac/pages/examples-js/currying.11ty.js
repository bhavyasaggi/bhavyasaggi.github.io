module.exports = `
function add(a, b, c) {
  return a + b + c
}

function mul(a, b, c, d, e, f) {
  return a * b * c * d * e * f
}

// implement this
const processData = (fn) => {
  const params = []
  const cb = (...args) => {
    if (!args.length && params.length >= fn.length) {
      return fn(...params)
    }
    params.push(...args)
    return cb
  }
  return cb
}

console.log(processData(add)(1, 2, 3)()) // 6
console.log(processData(add)(1)(2)(2)()) // 5
console.log(processData(add)(2)(4, 3)()) // 9

console.log(processData(mul)(1)(1)(1)(1)(1)(1)()) // 1
console.log(processData(mul)(1)(1)(1)(1)(2, 1)()) // 2
console.log(processData(mul)(1, 1)(1)(1)(2, 1)()) // 2
console.log(processData(mul)(1, 1, 10)(1)(2, 1)()) // 20
console.log(processData(mul)(1, 1, 10, 0)(2, 1)()) // 0

`
