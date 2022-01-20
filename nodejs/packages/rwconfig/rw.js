const fs = require('fs');

const jsonData = {
    b: '123',
}

const filename = './config.json';
//fs.writeFileSync(filename, JSON.stringify(jsonData));


fs.readFile(filename, (err, data) => {
    if (err) { console.log(err); return ;}
    console.log(data.toString());

    fs.writeFile(filename, '', (err) => {
        console.log(err);
    })
})
