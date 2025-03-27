import React from "react";
import { FormElement } from "../../FormElement";
import "./index.css";

interface Props {
  readonly onChange: (e: React.ChangeEvent) => void;
  readonly onBlur?: (e: React.FocusEvent<unknown, Element>) => void;
  readonly name: string;
  readonly value: string;
  readonly label?: string;
  readonly placeholder?: string;
}

export const TextArea = React.memo(({ label, ...restProps }: Props) => (
  <FormElement label={label ?? restProps.name.toUpperCase()}>
    <textarea {...restProps} id={restProps.name} />
  </FormElement>
));
