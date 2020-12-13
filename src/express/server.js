const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express(); 

// 解析form-data数据
const upload = multer(); 
// 解析json
app.use(bodyParser.json());
// 解析x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); // extended false 只能是数组或者字符产 true: 任何类型

app.listen(3000, () => {
    console.log('server start');
})

app.get('/user/login', (req, res) => {
    console.log(req.query);
    const { user, passwd } = req.query;
    if (user === 'xiaobai', passwd === '123') {
        res.send({ error: 0, result: 'success'});
    } else {
        res.send({ error: -1, result: 'error' });
    }
});
app.post('/user/register', upload.none(), (req, res) => {
    // console.log(req);
    // 接受body数据 req.body; express 不能直接解析消息体
    console.log(req.body);
    res.json(req.body)
    // res.send('success');
});
