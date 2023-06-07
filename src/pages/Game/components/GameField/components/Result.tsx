import { connection } from "store";
import { Button } from "components";
import React from "react";
import { observer } from "mobx-react";

export const Result = observer(() => {
  const repeatClickHandler = () => {
    connection.game?.repeatGame();
  };
  const getResultText = () => {
    switch (connection.game?.result) {
      case "win":
        return "Вы выиграли!";
      case "draw":
        return "Ничья";
      case "loss":
        return "Вы проиграли!";
      default:
        return "";
    }
  };
  return (
    <div className="absolute top-0 left-0 z-10 bg-white/80 flex items-center justify-center h-full w-full ">
      <div className="flex flex-col gap-4 items-center">
        <h3 className="text-4xl">{getResultText()}</h3>

        <Button onClick={repeatClickHandler}>Повторить</Button>
      </div>
    </div>
  );
});
