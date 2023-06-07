import { connection } from "store";
import React from "react";
import { observer } from "mobx-react";
import { AwaitLoader, Field, Result, StartButton } from "./components";

export const GameField = observer(() => {
  const isNotStarted = connection.game?.isNotStarted;
  const isWaiting = connection.game?.awaitP2Start;
  const isFinished = connection.game?.isFinished;
  return (
    <div className="page center bg-white rounded-xl flex flex-col gap-4 p-4 mx-auto max-w-screen-lg relative">
      {isNotStarted && <StartButton />}
      {isWaiting && <AwaitLoader />}
      <Field />
      {isFinished && <Result />}
    </div>
  );
});
