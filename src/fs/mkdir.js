const fs = require('fs');

// fs.mkdir('./test', (err) => {
//     if (err) {
//         console.log("创建失败")
//     }
// })

// fs.rename('./test1', './test2', (err) => {
//     if (err) console.log("修改失败");
// })
fs.rmdir('./test2', (err) => {
    if (err) {
        console.log("删除失败");
    }
});