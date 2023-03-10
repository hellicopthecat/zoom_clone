import express from "express";
import http from "http";
import WebSocket, {WebSocketServer} from "ws";

const app = express();
const port = 8000;

// console.log(__dirname);

app.set("views", __dirname + "/views");
app.set("view engine", "pug");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () =>
  console.log(`✅ Server is Listening http://localhost:${port} ✅`);
// app.listen(port, handleListen);

const server = http.createServer(app);
const wss = new WebSocketServer({server});

const sockets = [];

wss.on("connection", (socket) => {
  console.log("connected to browser!!!");
  socket.on("close", () => {
    console.log("disconnected from the browser");
  });
  sockets.push(socket);
  socket["nickname"] = "Anonymous";
  socket.on("message", (message) => {
    const messageData = message.toString("utf8");
    const parsed = JSON.parse(messageData);
    switch (parsed.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${parsed.payload}`)
        );
      case "nickname":
        socket["nickname"] = parsed.payload;
    }
  });
});

server.listen(port, handleListen);
