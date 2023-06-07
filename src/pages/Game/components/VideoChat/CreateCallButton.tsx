import { Button } from "components";
import React from "react";
import { connection } from "store";
import { getStream } from "./utils";
import { observer } from "mobx-react";

export const CreateCallButton = observer(() => {
  const clickHandler = async () => {
    const stream = await getStream();
    if (connection?.channel?.peer)
      connection.addCall(connection.channel.peer, stream);
  };
  return <Button onClick={clickHandler}>Позвонить</Button>;
});
