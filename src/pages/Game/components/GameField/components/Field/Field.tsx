import {
  FaHandPaper,
  FaHandRock,
  FaHandScissors,
  FaQuestion,
} from "react-icons/fa";
import React, { useEffect, useMemo } from "react";
import { connection } from "store";
import { ActionButton } from "./ActionButton";
import { observer } from "mobx-react";
import { IconType } from "react-icons";
import { observable } from "mobx";
import { Score } from "model/Game";

const score: Score = observable({
  win: 0,
  draw: 0,
  loss: 0,
});
export const Field = observer(() => {
  const YourIcon: IconType = useMemo(() => {
    switch (connection.game?.yourStep) {
      case "rock":
        return FaHandRock;
      case "scissors":
        return FaHandScissors;
      case "paper":
        return FaHandPaper;
      default:
        return FaQuestion;
    }
  }, [connection.game?.yourStep]);

  useEffect(() => {
    if (connection.game?.isFinished) {
      switch (connection.game.result) {
        case "draw":
          score.draw += 1;
          break;
        case "loss":
          score.loss += 1;
          break;
        case "win":
          score.win += 1;
          break;
        default:
          break;
      }
    }
  }, [connection.game?.isFinished]);

  const OpponentIcon: IconType = useMemo(() => {
    if (!connection.game?.yourStep) return FaQuestion;
    switch (connection.game?.opponentStep) {
      case "rock":
        return FaHandRock;
      case "scissors":
        return FaHandScissors;
      case "paper":
        return FaHandPaper;
      default:
        return FaQuestion;
    }
  }, [connection.game?.yourStep, connection.game?.opponentStep]);

  return (
    <div className="flex flex-col gap-8 items-center relative">
      <p className="text-center text-2xl">
        Счёт:
        <span className="text-green-600 font-semibold">{score.win}</span>/
        {score.draw}/
        <span className="text-red-600 font-semibold ">{score.loss}</span>
      </p>
      <div className="flex flex-row gap-4 items-center">
        <YourIcon
          size={64}
          stroke="#FF8D3D"
          strokeWidth={10}
          className={"fill-[#FF8D3D]/50"}
        />
        <p className="uppercase text-4xl">VS</p>
        <OpponentIcon
          size={64}
          stroke="#FF8D3D"
          strokeWidth={10}
          className={"fill-[#FF8D3D]/50"}
        />
      </div>
      {!connection.game?.yourStep && (
        <div className="flex gap-10">
          <ActionButton item="rock" />
          <ActionButton item="paper" />
          <ActionButton item="scissors" />
        </div>
      )}
    </div>
  );
});
