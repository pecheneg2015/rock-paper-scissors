import React, { FormEvent, useState } from "react";
import { Button } from "../../../../../components";

type MessageFormProps = {
  onSubmit: (val: string) => void;
};
export const MessageForm: React.FC<MessageFormProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
  };

  const onInputChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex items-center gap-4">
        <input
          type="text"
          onInput={onInputChange}
          value={inputValue}
          className="grow bg-[#FF8D3D]/10 border border-[#FF8D3D]/50 text-gray-600 text-sm rounded-lg focus:ring-0 focus:outline-0 focus:border-[#FF8D3D]  px-2.5 py-2"
          placeholder="Введите текст сообщения..."
        />
        <Button type="submit">Отправить</Button>
      </div>
    </form>
  );
};
