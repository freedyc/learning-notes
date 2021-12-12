const express = require('express');
const app = express();
 

app.get('/test1', (req, res, next) => {
    console.log('test1');
    next();
}, (req, res) => {
    console,log('test 1111 ');
    res.sent('ok')
});

app.listen(3000, () => {
    console.log('server start');
})