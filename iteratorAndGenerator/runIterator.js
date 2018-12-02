function run(generator){
    var task = generator();
    var result = task.next()

    function step() {
        if(!result.done) {
            result = task.next();
            step();
        }
    }
    step();
}

run(function*() {
    yield 1;
    console.log(1);
    yield 2;
    console.log(2);
    yield 3;
    console.log(3);
})