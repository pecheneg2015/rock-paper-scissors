import { Button } from "components";
import React from "react";
import { connection } from "store";
import { observer } from "mobx-react";

export const EndCallButton = observer(() => {
  const { videoChat } = connection;
  const resetClickHandler = () => {
    videoChat?.resetCall();
  };
  return <Button onClick={resetClickHandler}>Завершить</Button>;
});
