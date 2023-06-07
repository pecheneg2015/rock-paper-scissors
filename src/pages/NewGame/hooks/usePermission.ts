import { useEffect, useMemo, useState } from "react";

type Permission = "camera" | "microphone" | "clipboard-write";
export const usePermission = (name: Permission) => {
  const [state, setState] = useState<PermissionState | "default" | "error">(
    "default"
  );
  const permissionsIsAvailable = useMemo(
    () => window?.navigator?.permissions,
    []
  );
  const checkPermission = (name: PermissionName) => {
    window.navigator.permissions
      .query({ name: name })
      .then((status) => {
        setState(status.state);
      })
      .catch(() => setState("error"));
  };

  useEffect(() => {
    permissionsIsAvailable
      ? checkPermission(name as PermissionName)
      : setState("error");
  }, [name, permissionsIsAvailable]);

  return state;
};
