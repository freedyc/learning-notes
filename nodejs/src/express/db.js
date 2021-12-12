const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/users", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection; // 数据库连接对象

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('db ok');
})

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: { type: String, required: true },
    passwd: { type: String, required: true},
    age: Number,
    sex: { type: Number, default: 0 }
});

const User = mongoose.model('user', userSchema) //该数据对象和集合相关联 （集合名, schema对象）


// User.insertMany({ user: "xiaobai", passwd: "123", age: 123, age: 16 }).then((data) => {
//     console.log(data);
//     console.log('插入成功');
// }).catch((err) => {
//     console.log('插入失败');
// })

// 查询

// User.find({ age: 11 }).then((data) => {
//     console.log(data);
// }).catch(() => {
//     console.log('查询失败');
// })

// 删除

User.remove().then((data) => {
    console.log(data);
    console.log("删除成功");
}).catch(() => {
    console.log('删除失败');
})