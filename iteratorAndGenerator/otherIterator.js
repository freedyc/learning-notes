function *createIterator() {
    yield 1;
    var a = 3;
    a = a + 10;
    console.log(1, a);
    yield 4
    return false
}

var iterator = createIterator();
// console.log(iterator.next());
var result = iterator.next();
console.log(result);
console.log(iterator.next());
console.log(iterator.next());