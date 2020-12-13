const fs = require('fs');

// let dirs = fs.readdirSync('./');
fs.readdir('./file', (err, data) => {
    if (err) { 
        console.log("读取失败");
    } else {
        console.log(data);
    }
})
