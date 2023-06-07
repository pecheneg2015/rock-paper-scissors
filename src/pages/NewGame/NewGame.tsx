import React, { useEffect } from "react";
import { Routes } from "constants/routes";
import { Navigate, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { connection } from "store";

import { useLink } from "./hooks";
import { CopyLink, InviteLinkInput, ShareLink } from "./components";

export const NewGame: React.FC = observer(() => {
  const { id = "", currentStatus: status } = connection;
  const navigate = useNavigate();
  const inviteLink = useLink(id);
  useEffect(() => {
    if (status === "CONNECT") navigate(Routes.GAME);
  }, [navigate, status]);

  if (!id) return <Navigate to={Routes.ERROR} />;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-4 grid grid-cols-5  gap-4 max-w-screen-sm mx-2 md:mx-0">
        <p className="text-2xl col-span-5 text-[#673E23]">
          Поделитесь с другом ссылкой для подключения:
        </p>
        <InviteLinkInput link={inviteLink} />
        <div className="flex items-center gap-4">
          <CopyLink link={inviteLink} />
          <ShareLink link={inviteLink} />
        </div>
      </div>
    </div>
  );
});
