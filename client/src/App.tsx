import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

interface Player {
  id: string;
  name: string;
  hp: number;
}

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    socket.on("update-players", (players: Player[]) => {
      setPlayers(players);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinGame = () => {
    if (name) {
      socket.emit("join-game", name);
      setJoined(true);
    }
  };

  const attackPlayer = (id: string) => {
    socket.emit("attack", id);
  };

  return (
    <div>
      <h1>DnD Battle Game</h1>
      {!joined ? (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={joinGame}>Join Game</button>
        </div>
      ) : (
        <div>
          <h2>Players:</h2>
          {players.map((player) => (
            <div key={player.id}>
              <p>{player.name} - HP: {player.hp}</p>
              {player.id !== socket.id && (
                <button onClick={() => attackPlayer(player.id)}>Attack</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
