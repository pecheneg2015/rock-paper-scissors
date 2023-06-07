import { ButtonHTMLAttributes } from "react";

export const Button = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`bg-[#FF8D3D] hover:bg-[#FF8D3D]/80 transition-all  rounded-md px-2 py-1.5 text-white ${className} `}
    />
  );
};
