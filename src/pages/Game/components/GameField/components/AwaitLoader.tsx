import React from "react";
import { Loader } from "components";

export const AwaitLoader = () => (
  <div className="absolute top-0 left-0 z-10 bg-white/80 flex items-center justify-center h-full w-full ">
    <div className="flex flex-col gap-4 items-center">
      <Loader />
      <p>Ждём второго игрока...</p>
    </div>
  </div>
);
