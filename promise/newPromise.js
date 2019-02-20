let fs = require('fs');

var promise = new Promise(function(resolve, reject) {
    fs.readFile('./text.txt','utf-8', function(err, data) {
        if( err) reject(err);
        resolve(data);
    })

});

promise.then(function(data) {
    console.log(data)
},function(err) {
    console.log("file error:",err);
})
