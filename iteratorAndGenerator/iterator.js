function createIterator(items) {
    i = 0;
    return {
        next: function() {
            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;
            return {
                done: done,
                value: value
            }
        }
    }
}


var array = [1,2,3,4]

var iterator = createIterator(array);

console.log(iterator)
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

var iterator1 = createIterator(["one","two","three","four"]);
console.log(iterator1)
console.log(iterator1.next())
console.log(iterator1.next())
console.log(iterator1.next())
console.log(iterator1.next())
console.log(iterator1.next())


