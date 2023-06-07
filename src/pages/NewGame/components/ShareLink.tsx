import { IconButton } from "components";
import { FaShare } from "react-icons/fa";
import React, { useCallback } from "react";

type ShareLinkProps = {
  link: string;
};

export const ShareLink = ({ link }: ShareLinkProps) => {
  const onShareClick = useCallback(() => {
    navigator.share({
      text: "Ссылка для подключения",
      title: "Камень,ножницы,бумага",
      url: link,
    });
  }, [link]);
  return <IconButton Icon={FaShare} onClick={onShareClick} />;
};
