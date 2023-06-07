import { useMemo } from "react";
import { Routes } from "constants/routes";

export const useLink = (id: string) => {
  const host = window.location.origin;
  const path = useMemo(() => Routes.CONNECT.replace(":id", id), [id]);

  return `${host}${path}`;
};
