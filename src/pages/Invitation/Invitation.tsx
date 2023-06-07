import { Navigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { Loader } from "components";
import { observer } from "mobx-react";
import { connection } from "store";
import { Routes } from "constants/routes";

export const Invitation = observer(() => {
  const { id } = useParams<{ id: string }>();
  const { currentStatus } = connection;

  useEffect(() => {
    if (id && currentStatus === "OPEN") connection.addConnection(id);
  }, [currentStatus, id]);

  if (currentStatus === "OPEN") return <Navigate to={Routes.GAME} />;

  return (
    <div className="page center">
      <Loader />
    </div>
  );
});
