import express, { Application } from "express";
import userRoutes from "./src/routes/users.routes";
import cors from 'cors';

const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const corsOptions = {
    origin: ['http://localhost:3000', 'https://botd-widget.reimanbutterfly.com'],  // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'UPDATE'],  // Allow all required HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization']  // Add headers as needed
};

app.use(express.json());
// app.use((req, res, next) => {
//     console.log(req.method, req.url, req.headers, req.body);
//     next();
// });

app.use(cors(corsOptions));

app.use("/users", userRoutes);

app.get('/', (req, res) => {
    res.send('Hello from the botd backend');
  });

app
.listen(PORT, "0.0.0.0", function () {
console.log(`Server is running on port ${PORT}.`);
})
.on("error", (err: any) => {
if (err.code === "EADDRINUSE") {
    console.log("Error: address already in use");
} else {
    console.log(err);
}
});


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