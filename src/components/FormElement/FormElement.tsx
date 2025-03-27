import React from "react";
import "./index.css";

interface FormElementProps {
  readonly label: string;
  readonly children: React.JSX.Element;
}

export const FormElement = React.memo(
  ({ children, label }: FormElementProps) => (
    <div className="form-element">
      <label>{label}</label>
      {children}
    </div>
  )
);
