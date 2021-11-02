const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const httpServer = createServer(app);

const fs = require('fs');

const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:4000", `http://${process.env.REACT_APP_SERVER_IP}:4000`],
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.on("change", (view) => {
        console.log({ io: "change", view });
        socket.broadcast.emit('change_view', view)
    })
}
);

httpServer.listen(4000, () => {
    console.log('Live Photo Frame server running')
});

app.use(express.static(__dirname + '/build'));

app.get("/api/videos/list", (req, res) => {
    fs.readdir(path.join(__dirname, '/videos'), (err, files) => {
        res.send(files);
    })
})

app.get("/api/change/:view", (req, res) => {
    const { view } = req.params;
    io.emit('change_view', view)
    return res.sendStatus(200);
})

app.get("/videos/:file", (req, res) => {
    const { file } = req.params;
    res.sendFile(path.join(__dirname, '/videos', `${file}`));
})

app.get('/*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'build/index.html'));
});