console.log('sync start')
setTimeout(() => {
    console.log('setTimeout');
}, 2);


setImmediate(() => {
    console.log('setImmediate')
})

process.nextTick(() => {
    console.log('nextTick')
})

new Promise((resolve) => {
    console.log('Create Promise');
    resolve()
}).then(() => {
    console.log("Promise resolve");
})

console.log('sync end');