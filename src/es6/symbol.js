console.log(Symbol.iterator);
console.log(Symbol.asyncIterator);

class Foo {
    async *[Symbol.asyncIterator]() {}
}

let f = new Foo();

console.log(f[Symbol.asyncIterator]())

class Emitter {
    constructor(max) {
        this.max = max;
        this.asyncIdx = 0;
    }

    async *[Symbol.asyncIterator]() {
        while(this.asyncIdx < this.max) {
            yield new Promise((resolve) => resolve(this.asyncIdx++));
        }
    }
}

async function asyncCount() {
    let emitter = new Emitter(5);
    for await(const x of emitter) {
        console.log(x);
    }
}

asyncCount();