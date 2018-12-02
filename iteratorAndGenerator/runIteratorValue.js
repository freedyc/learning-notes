function run(taskGen) {
    var task = taskGen();
    var result = task.next();
    function step() {
        if(!result.done) {
            result = task.next(result.value);
            step();
        }
    }
    step();
}

run(function* () {
    let value = yield 1;
    console.log(value);
    value = yield value + 3;
    console.log(value);
});

function fetchData() {
    return function(callback) {
        setTimeout(function() {
            callback(null, "Sync Hello!")
        })
        console.log("输出");
        // callback(null, "Hello");
    }
}
fetchData()(function(){console.log(arguments[1])});