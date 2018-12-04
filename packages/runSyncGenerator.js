const fs = require('fs');
function run(gen) {
    let task = gen();
    let result = task.next();
    function step() {
        if(!result.done) {
            if (typeof result.value === 'function') {
                result.value(function(err, data) {
                    if (err) { throw err };
                    result = task.next(data);
                    step();
                });
            } else {
                result = task.next();
                step();
            }
        }
    }
    step();
}

function fetchData(fileName) {
    return function(callback) {
        fs.readFile(fileName, callback);
    }
}
run(function* () {
    var a = yield fetchData("./read.txt");
    console.log(a);
})

export { fetchData };