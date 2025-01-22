const WebSocket = require('ws');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on('connection', (ws) => {
    console.log("Client connected");
    clients.push(ws);

    ws.on('message', (message) => {
        console.log("Received message:", message);

        // Broadcast message to all other clients
        clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message); // Ensure it's sent as a string
            }
        });
    });

    ws.on('close', () => {
        console.log("Client disconnected");
        clients = clients.filter((client) => client !== ws);
    });
});

app.use(express.static('public'));

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
