const fs = require('fs');

const DBManager = {};

const get = (key) => {
    if (!key) return null;

    fs.readFile('./db.json', (err, data) => {
        const json = err ? { } : JSON.parse(data);
        console.log(json[key]);
    })
}

const set = (key, val) => {
    if (!key || !val) return 'input error'
    fs.readFile('./db.json', (err, data) => {
        const obj = err ? {} : JSON.parse(data);
        obj[key] = val;
        fs.writeFile('./db.json', JSON.stringify(obj), (err) => {});
        console.log("write done");
    })
}

DBManager["get"] = get;

DBManager["set"] = set;

DBManager["help"] = () => {
    console.log("set <set key value> write value")
    console.log("get <get key> get value")
    console.log("quit exit command")
}

// common line
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


rl.on("line", (input) => {
    if (!input) return '';
    const [op, key, value] = input.split(/\s+/)
    if (typeof DBManager[op] === "function") {
        DBManager[op](key, value);
    } else if (op === 'quit') {
        rl.close();
    } else if (op === 'clear') {
        fs.writeFile("./db.json", "{}", () => { console.log("clear done")})
    } else {
        console.log(`command not fount: ${input}`)
    }
})

rl.on("close", () => {
    console.log("exit command line")
    process.exit(0);
})

console.log("DBManger command\n")
