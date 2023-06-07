import React from "react";
import { observer } from "mobx-react";
import { connection } from "store";
import { Stream } from "./Stream";
import { EndCallButton } from "./EndCallButton";

export const VideoCall = observer(() => {
  const { videoChat } = connection;
  return (
    <div className="page center  flex flex-col gap-4">
      <EndCallButton />

      {videoChat && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Stream stream={videoChat.localSrc} isMuted />
          <Stream stream={videoChat.remoteSrc} />
        </div>
      )}
    </div>
  );
});
