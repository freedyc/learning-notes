let collection = {
    items: [1,2,3,4],
    *[Symbol.iterator]() {
        for (let item of this.items) {
            yield item
        }
    }
}

for (let x of collection) {
    console.log(x);
}
