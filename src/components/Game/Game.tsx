import "./Game.css";
import GameBoard from "../GameBoard/GameBoard";
import GameKeyboard from "../GameKeyboard/GameKeyboard";

const Game = () => {
  return (
    <div id="game-wrapper">
      <GameBoard />
      <GameKeyboard />
    </div>
  );
};

export default Game;
