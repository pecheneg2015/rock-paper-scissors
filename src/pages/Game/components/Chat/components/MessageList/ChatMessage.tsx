import { Message } from "model/Chat";
import React from "react";

type ChatMessageProps = {
  message: Message;
};
export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isInput = message.type === "Input";
  const playerName = isInput ? "Игрок 2" : "Игрок 1";

  return (
    <div
      className={`${
        isInput ? "bg-[#F3686E]/25" : "bg-[#49577F]/25"
      } rounded-lg text-[#673E23] px-2 py-1.5 col-span-4  flex flex-col h-max w-max ${
        isInput ? "self-end" : "self-start"
      }`}
    >
      <p className="text-md">{playerName}</p>
      <p className="text-lg  ">{message.text}</p>
    </div>
  );
};
