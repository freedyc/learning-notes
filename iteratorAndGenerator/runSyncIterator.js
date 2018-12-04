var fs = require('fs');
function run(g) {
    const task = g();
    let result = task.next();
    function step(){
        if(!result.done) {
            if(typeof result.value === 'function') {
                result.value(function(err, data) {
                    if(err) {
                        throw err;
                    }
                    result = task.next(data);
                    step();
                })
            } else {
                result = task.next(result.value);
                step()//;
            }
        }
    }
    step();
}

function readFile(filename){
    return function(callback) {
        fs.readFile(filename, callback);
    }
}
run(function* () {
    let contents = yield readFile('./iterator.js');
    let contents1 = yield readFile('./runIterator.js');
    console.log(contents);
    console.log(contents1);
})