const fs = require('fs');
// 创建
// fs.writeFile('name.txt', '天气不错呀', (err) => {
//     if (err) {
//         console.log('创建失败哎');
//     }
// })
// 写入
// fs.appendFile('name.txt', '2019年12月25日', (err) => {
//     if (err) console.log('写入失败');
// });
// 读取
// const text = fs.readFileSync('name.txt');
// console.log(`读取内容为： ${text}`);
// fs.readFile('name.txt', (err, data) => {
//     if (err) {
//         console.log('读取错误');
//     } else {
//         console.log(`读取的数据为：${data}`);
//     }
// })
// 删除

// fs.unlink('name.txt', (err) => {
//     if (err) console.log("删除失败")
// })
fs.stat('../fs', (err, stats) => {
    console.log(err, stats);
    console.log(stats.isDirectory())
})