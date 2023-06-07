import React, { useCallback } from "react";
import { connection } from "store";
import { Item } from "model/Game";
import { IconType } from "react-icons";
import { FaHandPaper, FaHandRock, FaHandScissors } from "react-icons/fa";
import { IconButton } from "../../../../../../components";

type ActionIconMap = {
  [x in Item]: IconType;
};

const iconsMap: ActionIconMap = {
  paper: FaHandPaper,
  rock: FaHandRock,
  scissors: FaHandScissors,
};

type ActionButtonProps = {
  item: Item;
};
export const ActionButton: React.FC<ActionButtonProps> = ({ item }) => {
  const onItemCLick = useCallback(() => {
    connection.game?.sendStep(item);
  }, [item]);
  const Icon = iconsMap[item];
  return (
    <IconButton
      Icon={Icon}
      isTransparent
      iconProps={{
        size: 48,
        stroke: "#FF8D3D",
        strokeWidth: 10,
        className:
          "cursor-pointer fill-[#FF8D3D]/50 hover:fill-[#FF8D3D]/80 transition-colors",
      }}
      onClick={onItemCLick}
    />
  );
};
