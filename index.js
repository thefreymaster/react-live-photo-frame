const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
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
    console.log('server running')
});

app.use(express.static(__dirname + '/build'));

app.post("/api/change/:view", (req, res) => {
    const { view } = req.body;
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