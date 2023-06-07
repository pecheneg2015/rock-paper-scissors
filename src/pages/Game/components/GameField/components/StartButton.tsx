import { connection } from "store";
import React from "react";
import { observer } from "mobx-react";
import { Button } from "components";

export const StartButton = observer(() => {
  const onStartClick = () => {
    connection.game?.startGame();
  };
  return (
    <div className="absolute top-0 left-0 z-10 bg-white/80 flex items-center justify-center h-full w-full">
      <Button onClick={onStartClick} disabled={connection.game?.awaitP2Start}>
        Начать
      </Button>
    </div>
  );
});
