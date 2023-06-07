import React, { useMemo } from "react";
import { connection } from "store";
import { observer } from "mobx-react";
import { CreateCallButton } from "./CreateCallButton";
import { AnswerCallButton } from "./AnswerCallButton";
import { AwaitAnswerInfo } from "./AwaitAnswerInfo";
import { VideoCall } from "./VideoCall";

export const VideoChat = observer(() => {
  const { videoChat } = connection;
  const hasIncomingCall = useMemo(
    () =>
      videoChat?.callType === "IN" &&
      !videoChat.isAnswered &&
      videoChat.isReady,
    [videoChat?.callType, videoChat?.isAnswered, videoChat?.isReady]
  );
  const hasOutgoingCall = useMemo(
    () =>
      videoChat?.callType === "OUT" &&
      !videoChat.isAnswered &&
      videoChat.isReady,
    [videoChat?.callType, videoChat?.isAnswered, videoChat?.isReady]
  );

  const canCreateOutgoingCall = useMemo(
    () => !videoChat || !videoChat.isReady,
    [videoChat, videoChat?.isReady]
  );

  const hasActiveCall = useMemo(
    () => videoChat && videoChat.isAnswered && videoChat.isReady,
    [videoChat, videoChat?.isReady, videoChat?.isAnswered]
  );
  console.log(hasActiveCall);

  return (
    <div className="page center bg-white rounded-xl flex flex-col gap-4 p-4 min-h-[200px] mx-auto max-w-screen-lg">
      {hasIncomingCall && <AnswerCallButton />}
      {hasOutgoingCall && <AwaitAnswerInfo />}
      {canCreateOutgoingCall && <CreateCallButton />}
      {hasActiveCall && <VideoCall />}
    </div>
  );
});
