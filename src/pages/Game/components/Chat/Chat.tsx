import React from "react";
import { observer } from "mobx-react";
import { connection } from "store";
import { Navigate } from "react-router-dom";
import { Routes } from "constants/routes";
import { MessageForm, MessageList } from "./components";

export const Chat: React.FC = observer(() => {
  const { chat } = connection;

  if (!chat) return <Navigate to={Routes.ERROR} />;

  const sendMessage = (val: string) => {
    chat.sendMessage(val);
  };
  return (
    <div className="bg-white rounded-xl flex flex-col gap-4 p-4 h-64 mx-auto max-w-screen-lg">
      <MessageList messages={chat.messages} />
      <MessageForm onSubmit={sendMessage} />
    </div>
  );
});
