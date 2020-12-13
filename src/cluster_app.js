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
    cluster.on('listening', function(worker, address) {
        console.log(`A worker with  #${worker.id} is now connected to ${address.address}:${address.port}`)
    });

} else {
    console.log(`Slave is ${process.pid}`);
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Hello world!');
    }).listen({ host: '127.0.0.1', port: 8000 });    
}

