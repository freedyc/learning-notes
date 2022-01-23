const express = require('express');


const app = express();


app.get('/*', (req, res) => {
    console.log(req.path);
    console.log(req.query);
    res.send(JSON.stringify({a: 123 }));
});
app.listen(3003, () => {
    console.log('start');
})
