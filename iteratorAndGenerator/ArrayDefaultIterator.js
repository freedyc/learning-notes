let values = [1,2,3,4]
let iterator = values[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next())
