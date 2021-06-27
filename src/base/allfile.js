const glob = require('glob');

let result = null;

console.time("glob")
glob(__dirname + "/**/*.js", (err, res) => {
    console.log(res);
})

console.timeEnd("glob");


console.time("glob async");

result = glob.sync(__dirname + "/**/*.js");

console.log(result);

console.timeEnd("glob async")


