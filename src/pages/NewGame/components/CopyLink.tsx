import { IconButton } from "components";
import { FaCopy } from "react-icons/fa";
import React, { useCallback, useMemo } from "react";

import { usePermission } from "../hooks";

type CopyLinkProps = {
  link: string;
};

export const CopyLink = ({ link }: CopyLinkProps) => {
  const clipboardStatus = usePermission("clipboard-write");
  const clipboardIsAvailable = useMemo(
    () => clipboardStatus === "granted",
    [clipboardStatus]
  );

  const onCopyClick = useCallback(() => {
    navigator.clipboard.writeText(link);
  }, [link]);

  return (
    <>
      {clipboardIsAvailable ? (
        <IconButton Icon={FaCopy} onClick={onCopyClick} />
      ) : null}
    </>
  );
};
