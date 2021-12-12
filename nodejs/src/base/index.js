const game = require('./lib');
// const action = process.argv[process.argv.length - 1];

// game(action);

let count = 0;
process.stdin.on('data', (e) => {
    const result = game(e.toString().trim());
    if (result === 1) {
        count++;
    }
    if (count === 3) {
        console.log('你太厉害了， 不给你玩了');
        process.exit();
    }
})
