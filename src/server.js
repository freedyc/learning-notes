const http = require('http');

const server = http.createServer();
server.listen(3000, () => { 
    process.title = "程序进程测试";
    console.log('进程ID', process.pid);
});
