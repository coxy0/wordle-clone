import "./GameBoard.css";
import { useState, useEffect } from "react";
import answerListTxt from "../../assets/answerlist.txt";
import wordListTxt from "../../assets/wordlist.txt";
import { getTextContent } from "../../utils/textFilesReader";

const GameBoard = () => {
  const [wordList, setWordList] = useState<string[]>();
  const [answer, setAnswer] = useState<string>("");
  const [words, setWords] = useState<string[]>(["", "", "", "", "", ""]);
  const [activeRow, setActiveRow] = useState<number>(0);
  const [keyHeld, setKeyHeld] = useState<boolean>(false);

  useEffect(() => {
    (async function fetchTextData() {
      try {
        const { answerList, wordList } = await getTextContent(
          answerListTxt,
          wordListTxt
        );
        setAnswer(answerList[Math.floor(Math.random() * answerList.length)]);
        setWordList(wordList);
      } catch (err) {
        console.log(`Error getting text content: ${err}`);
      }
    })();
  }, []);

  const resetGame = () => {
    setWords(["", "", "", "", "", ""]);
    setActiveRow(0);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (keyHeld) return;
      setKeyHeld(true);

      const input = event.key;
      setWords((prevWords) => {
        const newWords = [...prevWords];
        let word = newWords[activeRow];

        if (/^[a-zA-Z]$/.test(input) && word.length < 5) word += input;
        else if (input === "Backspace" && word.length) word = word.slice(0, -1);
        else if (input === "Enter" && word.length === 5 && activeRow < 6) {
          if (wordList?.includes(word)) setActiveRow(activeRow + 1);

          if (activeRow === 5) {
            console.info(`Word was: ${answer}`);
            resetGame();
          }
        }

        newWords[activeRow] = word;
        return newWords;
      });
    };

    const handleKeyUp = () => setKeyHeld(false);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [activeRow, keyHeld]);

  return (
    <div id="game-board-wrapper">
      <div id="game-board">
        {words.map((word, index) => {
          const letters: string[] = word.padEnd(5, " ").split("");
          const guessed: boolean = index < activeRow;

          return (
            <div key={index} className="game-board-row">
              {letters.map((letter, index) => {
                const backgroundColour = !guessed
                  ? ""
                  : !answer.includes(letter)
                  ? " tile-absent"
                  : letter !== answer[index]
                  ? " tile-present"
                  : " tile-correct";

                return (
                  <div
                    key={index}
                    className={`game-board-tile${backgroundColour}`}
                  >
                    {letter.toUpperCase()}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;
