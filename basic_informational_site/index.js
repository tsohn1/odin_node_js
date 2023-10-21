const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const routes = {
  '/' : 'index.html',
  '/about' : 'about.html',
  '/contact-me' : 'contact-me.html',
};

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const url = req.url;
    if (routes[url]) {
      const file = routes[url];
      fs.readFile(file, (err, data) => {
        if (err) {
          res.statusCode = 500; // Internal Server Error
          res.setHeader('Content-Type', 'text/plain');
          res.end('Internal Server Error');
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          res.end(data);
        }
      });
    } else {
      fs.readFile("404.html", (err, data) => {
        if (err) {
          res.statusCode = 500; // Internal Server Error
          res.setHeader('Content-Type', 'text/plain');
          res.end('Internal Server Error');
        } else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end(data);
        }
      })
      
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
