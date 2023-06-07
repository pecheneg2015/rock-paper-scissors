import React from "react";
import { Connection } from "./model";
import { connection } from "./store";
const StoreContext = React.createContext<Store | null>(null);

type Store = {
  connectionStore: Connection;
};
const store: Store = {
  connectionStore: connection,
};
export const DataStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
export const useDataStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};
