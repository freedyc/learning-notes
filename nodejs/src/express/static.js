const express = require('express');

const app = express();
app.use(express.static(__dirname + '/static'));
app.listen(3000, () => {
    console.log('server start');
})