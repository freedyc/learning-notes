const express = require('express');

const app = express();

const userRouter = require('./userRouter');
const foodRouter = require('./foodRouter');
app.use('/user', userRouter);
app.use('/food/', foodRouter);
app.listen(3000, () => {
    console.log('server start');
})