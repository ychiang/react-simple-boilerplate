//SERVER

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));
// Create the WebSockets server
const wss = new SocketServer({
  server
});

const userCount = {
  type: 'userCount',
  connected: 0
};

wss.broadcast = function broadcast(messageObject) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === 1) {
      client.send(JSON.stringify(messageObject));
    }
  });
}

wss.on('connection', (ws) => {
  userCount.connected++;
  wss.broadcast(userCount);

  ws.on('message', (message) => {
    let messageObject = JSON.parse(message);
    messageObject.id = uuidv4();

    switch (messageObject.type) {
      case 'postMessage':
        messageObject.type = 'incomingMessage'
        break;
      case 'postNotification':
        messageObject.type = 'incomingNotification'
        break;
    }
    wss.broadcast(messageObject);
  });

  // Set up a callback for when a client closes the socket. 
  ws.on('close', () => {
    userCount.connected--;
    wss.broadcast(userCount);
  });
});