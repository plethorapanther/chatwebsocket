/**
Before running:
> npm install ws
Then:
> node server.js
> open http://localhost:8080 in the browser
*/

const http = require('http');
const fs = require('fs');
const ws = new require('ws');

const wss = new ws.Server({noServer: true});

const clients = new Set();

function accept(req, res) {

  if (req.url == '/ws' && req.headers.upgrade &&
      req.headers.upgrade.toLowerCase() == 'websocket' &&
      // can be Connection: keep-alive, Upgrade
      req.headers.connection.match(/\bupgrade\b/i)) {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
  } else if (req.url == '/') { // index.html
    fs.createReadStream('./index.html').pipe(res);
  } else { // page not found
    res.writeHead(404);
    res.end();
  }
}

function onSocketConnect(ws) {
  clients.add(ws);
  log(`new connection`);

  ws.on('message', function (message) {
    const data = JSON.parse(message);
    log(`message received: ${data.message}`);

    // Modify this section to handle the username
    const username = data.username.slice(0, 20); // max username length will be 20
    const formattedMessage = `${username}: ${data.message}`;

    for (let client of clients) {
      client.send(JSON.stringify({ message: formattedMessage }));
    }
  });

  ws.on('close', function () {
    log(`connection closed`);
    clients.delete(ws);
  });
}

let log;
if (!module.parent) {
  log = console.log;
  http.createServer(accept).listen(8080);
} else {
  // to embed into javascript.info
  log = function() {};
  // log = console.log;
  exports.accept = accept;
}

