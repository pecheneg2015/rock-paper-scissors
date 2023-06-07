import React from "react";
import { Navigate } from "react-router-dom";
import { Routes } from "constants/routes";
import { connection } from "store";
import { Chat, VideoChat, GameField } from "./components";
import { observer } from "mobx-react";

export const Game: React.FC = observer(() => {
  const { peer, chat, channel } = connection;

  if (!connection || !peer || !chat || !channel)
    return <Navigate to={Routes.ERROR} />;

  return (
    <div className="space-y-10">
      <GameField />
      <Chat />
      <VideoChat />
    </div>
  );
});
