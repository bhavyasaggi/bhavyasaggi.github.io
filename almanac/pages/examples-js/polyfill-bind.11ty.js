module.exports = `
// This method performs the following steps when called:
// https://tc39.es/ecma262/#sec-function.prototype.bind
//
// 1. Let Target be the this value.
// 2. If IsCallable(Target) is false, throw a TypeError exception.
// 3. Let F be ? BoundFunctionCreate(Target, thisArg, args).
// 4. Let L be 0.
// 5. Let targetHasLength be ? HasOwnProperty(Target, "length").
// 6. If targetHasLength is true, then
//   a. Let targetLen be ? Get(Target, "length").
//   b. If targetLen is a Number, then
//     i. If targetLen is +∞𝔽, then
//       1. Set L to +∞.
//     ii. Else if targetLen is -∞𝔽, then
//       1. Set L to 0.
//     iii. Else,
//       1. Let targetLenAsInt be ! ToIntegerOrInfinity(targetLen).
//       2. Assert: targetLenAsInt is finite.
//       3. Let argCount be the number of elements in args.
//       4. Set L to max(targetLenAsInt - argCount, 0).
// 7. Perform SetFunctionLength(F, L).
// 8. Let targetName be ? Get(Target, "name").
// 9. If targetName is not a String, set targetName to the empty String.
// 10. Perform SetFunctionName(F, targetName, "bound").
// 11. Return F.

Function.prototype.bind2 = function (obj, ...args) {
  let func = this;
  // Accepting arguments passed to newFunc
  return function (...newArgs) {
    func.apply(obj, [...args, ...newArgs]);
  };
};
`
