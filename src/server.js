import express from "express";

const app = express();
const port = 8000;

// console.log(__dirname);

app.set("views", __dirname + "/views");
app.set("view engine", "pug");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
const handleListen = () =>
  console.log(" ✅ Server is Listening localhost:8000 ✅");
app.listen(port, handleListen);
