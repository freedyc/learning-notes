const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const content = fs.readFileSync("./index.html", "utf8");
    res.write(content);
    res.end();
  } else if (req.url === "/data") {

    res.writeHead(200, { "Content-Type": "application/json" });
    let i = 0;
    function generateRandom() {
      if (i <= 9) {
        i++;
        const random = Math.floor(Math.random() * 999) + 1;
        const responseData = JSON.stringify({ random });
        console.log(responseData,'req.aborted', req.aborted);
        res.write(responseData);
        setTimeout(generateRandom, 1000);
      } else {
        res.end();
      }
    }

    generateRandom();
  } else if (req.url === "/fetch_cancel_request.html") {
    const content = fs.readFileSync("./fetch_cancel_request.html", "utf8");
    res.write(content);
    res.end(); 
  } else if (req.url === "/axios_cancel_request.html") {
    const content = fs.readFileSync("./fetch_cancel_request.html", "utf8");
    res.write(content);
    res.end(); 
  } else if (req.url === "/xmlhttprequest_cancel_request.html") {
    const content = fs.readFileSync("./fetch_cancel_request.html", "utf8");
    res.write(content);
    res.end(); 
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
