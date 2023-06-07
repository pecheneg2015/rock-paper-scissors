import { Loader } from "components";
import React from "react";

export const AwaitAnswerInfo = () => (
  <div className="flex flex-col space-y-4 items-center">
    <Loader />
    <p>Ожидайте ответа...</p>
  </div>
);
