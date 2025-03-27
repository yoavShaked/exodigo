import React from "react";
import "./index.css";

interface Props {
  readonly children: React.ReactNode;
  readonly onClick?: () => void;
  readonly type?: "button" | "submit" | "reset";
}

export const Button = React.memo(({ children, onClick, type }: Props) => (
  <button type={type} onClick={onClick} className="primary-button">
    {children}
  </button>
));
