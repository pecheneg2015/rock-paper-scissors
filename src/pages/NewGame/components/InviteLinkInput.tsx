import React from "react";

type InviteLinkInputProps = {
  link: string;
};
export const InviteLinkInput = ({ link }: InviteLinkInputProps) => {
  return (
    <input
      type="text"
      className="text-[#673E23] col-span-3  w-full bg-gray-100 rounded p-2 mr-4 border focus:outline-none focus:border-[#673E23] select-all"
      defaultValue={link}
      readOnly
    />
  );
};
