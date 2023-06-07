import { Button } from "components";
import React from "react";
import { getStream } from "./utils";
import { connection } from "store";
import { observer } from "mobx-react";

export const AnswerCallButton = observer(() => {
  const { videoChat } = connection;

  const answerHandler = async () => {
    const stream = await getStream();
    videoChat?.answer(stream);
  };
  return <Button onClick={answerHandler}>Ответить</Button>;
});
