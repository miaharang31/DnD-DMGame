import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log(`Player Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Player Disconnected: ${socket.id}`);
  });
});

app.get("/", (req, res) => {
  res.send("DND Battle Server is Running");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
