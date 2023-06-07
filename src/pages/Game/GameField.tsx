import React from "react";
import { FaHandPaper, FaHandRock, FaHandScissors } from "react-icons/fa";
import { observer } from "mobx-react";
import { connection } from "../../store";

const items = ["paper", "rock", "scissors"] as const;
type Item = (typeof items)[number];

export const GameField: React.FC = observer(() => {
  const onStartClick = () => {
    connection.game?.startGame();
  };

  const onItemCLick = (type: Item) => {
    connection.game?.sendStep(type);
  };

  return (
    <div>
      {connection.game?.isFinished && (
        <>
          <p>
            {connection.game.result === "win"
              ? "WIN!!!"
              : connection.game.result === "loss"
              ? "LOSS"
              : "DRAW"}
          </p>
          <button
            onClick={() => {
              connection.game?.repeatGame();
            }}
          >
            Повторить
          </button>
        </>
      )}
      {!connection.game?.isStarted && (
        <button onClick={onStartClick} disabled={connection.game?.awaitP2Start}>
          start
        </button>
      )}
      {connection.game?.isStarted && (
        <div className="flex gap-10">
          <FaHandRock
            size={112}
            stroke="red"
            strokeWidth={10}
            fill="none"
            className={"cursor-pointer"}
            onClick={() => onItemCLick("rock")}
          />
          <FaHandPaper
            size={112}
            stroke="red"
            strokeWidth={10}
            fill="none"
            className={"cursor-pointer"}
            onClick={() => onItemCLick("paper")}
          />
          <FaHandScissors
            size={112}
            stroke="red"
            strokeWidth={10}
            fill="none"
            className={"cursor-pointer"}
            onClick={() => onItemCLick("scissors")}
          />
        </div>
      )}
    </div>
  );
});
