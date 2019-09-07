const http = require('http');
const numCPUs = require('os').cpus().length;
const cluster = require('cluster');

if (cluster.isMaster) {
    console.log('Master process id is ', process.pid);
    for (let i = 0; i< numCPUs; i++ ) {
        cluster.fork();    
    }
    cluster.on('exit', function(worker, code , signal) {
        console.log('worker process died, id', worker.process.pid);
    })

} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('hello word');
    }).listen(8000);    
}

