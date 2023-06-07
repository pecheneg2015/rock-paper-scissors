import { Message } from "model/Chat";
import React from "react";
import { observer } from "mobx-react";
import { ChatMessage } from "./ChatMessage";

type MessageListProps = {
  messages: Message[];
};
export const MessageList: React.FC<MessageListProps> = observer(
  ({ messages }) => {
    if (messages.length === 0)
      return (
        <div className="w-ful h-full flex items-center justify-center">
          <p className=" text-lg text-gray-600/50">
            Здесь пока нет сообщений...
          </p>
        </div>
      );
    return (
      <div className="overflow-y-auto h-full flex flex-col gap-2">
        {messages.map((e) => (
          <ChatMessage message={e} key={e.createdAt.getTime()} />
        ))}
      </div>
    );
  }
);
