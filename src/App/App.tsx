import React from "react";
import { observer } from "mobx-react";
import { redirect, Route, Routes } from "react-router-dom";
import { Routes as RoutesList } from "constants/routes";
import { Game, NewGame, Invitation, ErrorPage, NotFoundPage } from "pages";
import { Loader } from "components";
import { useDataStore } from "context";

import "styles/styles.css";

export const App = observer(() => {
  const store = useDataStore();

  const {
    connectionStore: { currentStatus: status, id },
  } = store;

  if (status === "FAIL") redirect(RoutesList.ERROR);

  if (status === "DEFAULT")
    return (
      <div className="page center pagePadding ">
        <Loader />
      </div>
    );
  return (
    <div className={"page pagePadding overflow-auto"}>
      <Routes>
        <Route path={RoutesList.MAIN} element={<NewGame />}></Route>
        <Route path={RoutesList.CONNECT} element={<Invitation />}></Route>
        <Route path={RoutesList.GAME} element={<Game />} />
        <Route path={RoutesList.ERROR} element={<ErrorPage />}></Route>
        <Route path={RoutesList.NOT_DEFINED} element={<NotFoundPage />} />
      </Routes>
    </div>
  );
});
