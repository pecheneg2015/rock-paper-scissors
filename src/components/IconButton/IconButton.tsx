import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  HTMLProps,
} from "react";
import { IconBaseProps, IconType } from "react-icons";

type IconButtonProps = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "className"
> & {
  Icon: IconType;
  isTransparent?: boolean;
  iconProps?: IconBaseProps;
};
export const IconButton = ({
  Icon,
  iconProps = { size: "28", fill: "white" },
  isTransparent,
  disabled,
  ...props
}: IconButtonProps) => {
  console.log(disabled);
  return (
    <button
      disabled={disabled}
      {...props}
      className={`${
        !isTransparent
          ? "bg-[#FF8D3D] hover:bg-[#FF8D3D]/80 transition-all "
          : " "
      }  rounded-md p-1`}
    >
      <Icon {...iconProps} />
    </button>
  );
};
