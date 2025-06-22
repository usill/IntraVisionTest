"use client";

import { MouseEventHandler } from "react";
import {
  buttonDictionary,
  ButtonStyle,
  ButtonStyleItem,
} from "./ButtonDictionary";

export interface ButtonProps {
  style: ButtonStyle;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  style,
  children,
  disabled,
  className,
  onClick,
}) => {
  const { textColor, bgColor }: ButtonStyleItem = buttonDictionary[style];

  return (
    <button
      style={{ color: textColor, backgroundColor: bgColor }}
      onClick={onClick}
      disabled={disabled}
      className={`py-3 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
