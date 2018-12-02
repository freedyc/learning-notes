function *createIterator() {
    var a = yield 1;
    console.log(a);
    return "hello"
}
var ci1 = createIterator();

console.log(ci1.next(46));
console.log(ci1.next(1));
function *createIterator1() {
    let first = yield 1;
    console.log("first:", first);
    let a = 12 + 12;
    console.log(a);
    let second = yield first + 2;
    console.log("second:", second);
    yield second + 3;
}
var iterator1 = createIterator1();
var iterator2 = createIterator1();
console.log(iterator1.next());
console.log(iterator1.next(1));
console.log(iterator1.next(2));
for(let c of iterator2) {
    console.log(c);
}

function *createNumberIteraotr() {
    yield 1;
    yield 2;
    return 3;
}
function *createReppeatingIterator(result) {
    for(let i =0; i< result; i ++) {
        yield "repeat"
    }
}
function *createCombindIterator() {
    var result = yield* createNumberIteraotr();
    yield* createReppeatingIterator(result);
    return false;
}
var cCombind = createCombindIterator();
for(let iteam of cCombind) {
    console.log(iteam);
}