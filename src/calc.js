const http = require('http');
const longComputation = () => {
    let sum = 0;
    for (let i = 0; i< 1e10; i++) {
        sum += i;
    }
    return sum;
}
const gd = () => new Date();
const server = http.createServer();
server.on('request', (req, res) => {
    if (req.url === '/compute') {
         const startDate = gd();
         console.info('计算开始',startDate);
         const sum = longComputation();
         const endDate = gd();
         console.info('计算结束', endDate);
         res.write('<head><meta charset="utf-8"/></head>');
         return res.end(`Sum is ${sum}, 计算时间：${(endDate - startDate) / 1000}s`);
    } else {
         res.end('ok');
    }
})
server.listen(3000);
