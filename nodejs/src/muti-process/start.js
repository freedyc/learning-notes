const os = require('os');
const cluster = require('cluster');
const server = require('./app.js');
                       
let length = os.cpus().length;

if (cluster.isMaster) {
  while(length --> 0) {
    const worker = cluster.fork();
    console.log(`pid:${worker.process.pid}`);
  }
} else {
    server();
}
