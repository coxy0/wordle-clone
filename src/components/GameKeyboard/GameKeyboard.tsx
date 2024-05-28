import "./GameKeyboard.css";

interface Props {}

const GameKeyboard = ({}: Props) => {
  const buttons: string[][] = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
  ];

  return (
    <div id="game-keyboard-wrapper">
      {buttons.map((row, index) => (
        <div key={index} className="game-keyboard-row">
          {row.map((button, index) => (
            <button
              key={index}
              type="button"
              className={`game-keyboard-key${
                button === "ENTER" || button === "BACKSPACE"
                  ? " game-keyboard-key-big"
                  : ""
              }`}
            >
              {button}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameKeyboard;
