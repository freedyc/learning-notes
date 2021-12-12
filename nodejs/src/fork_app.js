const http = require('http');
const fork = require('child_process').fork;

const server = http.createServer((req, res) => {
    if (req.url === '/compute') {
        const compute = fork('./fork_compute.js');
        compute.send('开启一个新的子进程');
        compute.on('message', sum => {
            res.end(`Sum is ${sum}`);    
            compute.kill();
        });
        // 子进程监听一些错误消息退出
        compute.on('close', (code, signal) => {
            console.log(`收到close事件，子进程收到信号${signal}而终止，退出${code}`);
            compute.kill();
        })
    } else {
        res.end('ok');
    }
})

server.listen(3000, '127.0.0.1', () => {
    console.log(`server start at http://${'127.0.0.1'}:${3000}`);
});
