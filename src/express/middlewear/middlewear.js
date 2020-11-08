const express = require('express');
const app = express();

app.use('/', (req, res, next) => {
    console.log('中间件');
    let { token } = req.query;
    if (token) {
        next();
    } else {
        res.send('no ok');
    }
});

app.get('/test1', (req, res) => {
    console.log('test1');
    res.send('ok');
});

app.get('/test2', (req, res) => {
    console.log('test2');
    res.send('ok');
});

app.listen(3000, () => {
    console.log('server start');
})