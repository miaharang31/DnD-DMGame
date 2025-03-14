// import express from "express";
// import http from "http";
// import cors from "cors";
// import { Server } from "socket.io";

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: "*" },
// });

// app.use(cors());
// app.use(express.json());

// interface Player {
//   id: string;
//   name: string;
//   hp: number;
// }

// let players: Player[] = [];

// io.on("connection", (socket) => {
//   console.log(`Player Connected: ${socket.id}`);

//   socket.on("join-game", (name: string) => {
//     const newPlayer: Player = { id: socket.id, name, hp: 100 };
//     players.push(newPlayer);
//     io.emit("update-players", players);
//   });

//   socket.on("attack", (targetId: string) => {
//     players = players.map((p) =>
//       p.id === targetId ? { ...p, hp: p.hp - 10 } : p
//     );
//     io.emit("update-players", players);
//   });

//   socket.on("disconnect", () => {
//     players = players.filter((p) => p.id !== socket.id);
//     io.emit("update-players", players);
//   });
// });

// app.get("/", (req, res) => {
//   res.send("DND Battle Server is Running");
// });

// server.listen(5000, () => console.log("Server running on port 5000"));