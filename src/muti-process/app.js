const http = require('http')
const start = () => {
  http.createServer((res,req) => {
    req.writeHead(200);
    req.end('FREEDYC')
  }).listen(3000)
}

module.exports = start;
