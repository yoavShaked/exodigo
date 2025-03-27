import React from "react";
import "./index.css";

export const ErrorMessage = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => <div className="error-message">{children}</div>;
