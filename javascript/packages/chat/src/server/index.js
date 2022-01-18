const Koa = require('koa');
const fs = require('fs');
const http = require('http');

const { Server } = require('socket.io');

const app = new Koa();
const server = http.createServer(app.callback());

const io = new Server(server);

io.on('connection', (socket) => {
    socket.broadcast.emit('allMessage', "新用户上线");
    socket.on("message1", (data) => {
        console.log('接手到客户端消息：', data);
        socket.emit('allMessage', data)
        socket.broadcast.emit('allMessage', data);
    })
    socket.on('disconnect', () => {
        console.log('user disconnect')
    })
});

app.use(async (ctx) => {
    console.log(ctx.path);
    if (ctx.path === '/') {
        const index = fs.readFileSync('./index.html');
        ctx.type= "text/html"
        ctx.body = index
    }

    if (ctx.path === '/socket.io.js') {
        const js = fs.readFileSync('../../node_modules/socket.io/client-dist/socket.io.js');
        ctx.type = "text/javascript";
        ctx.body = js;
    }
})

server.listen(3001, () => {
    console.log('start 3000');
})
