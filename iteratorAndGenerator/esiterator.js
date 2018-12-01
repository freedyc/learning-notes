function *createIterator(){
    yield 1; yield 2; } 
var aIterator = createIterator();

console.log(aIterator.next());
console.log(aIterator.next());
console.log(aIterator.next());

function *createItems(items) {
    for( let i = 0; i <= items.length; i++ ) {
        yield items[i]
    }
}


var a1 =  createItems([1,2,3]);

console.log(a1.next());
console.log(a1.next());
console.log(a1.next());
console.log(a1.next());


var o = {
    *iterator() {
        yield 1
    }
}

var a2 = o.iterator();


console.log(a2.next());
console.log(a2.next());

