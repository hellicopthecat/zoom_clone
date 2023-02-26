import express from "express";

const app = express();
const port = 8000;

console.log("hello");

const handleListen = () =>
  console.log(" ✅ Server is Listening localhost:8000 ✅");
app.listen(port, handleListen);
