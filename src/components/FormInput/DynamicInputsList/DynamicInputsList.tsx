import React from "react";
import { Input } from "../Input";
import { Button } from "../../Button";
import "./index.css";

interface DynamicObject<T extends string> {
  readonly keys: ReadonlyArray<T>;
  readonly values: ReadonlyArray<{ [K in T]: string }>;
  readonly baseKey: string;
  readonly onChange: (e: React.ChangeEvent) => void;
  readonly onBlur: (e: React.FocusEvent<unknown, Element>) => void;
}

export const DynamicInputsList = <T extends string>({
  keys,
  values,
  baseKey,
  onBlur,
  onChange,
}: DynamicObject<T>) => {
  const [lines, setLines] = React.useState(1);

  const onClickAddRecipyLine = React.useCallback(() => {
    setLines((prevLines) => prevLines + 1);
  }, []);

  return (
    <div className="dynamic-inputs-container">
      <div className="inputs">
        {Array(lines)
          .fill(null)
          .map((_, i) => (
            <div key={`${baseKey}.${i}`} className="inputs-line">
              {keys.map((key) => (
                <Input
                  value={values[i]?.[key]}
                  onBlur={onBlur}
                  onChange={onChange}
                  name={`${baseKey}.${i}.${key}`}
                  label={key.toUpperCase()}
                  key={`${baseKey}.${i}.${key}`}
                />
              ))}
            </div>
          ))}
      </div>
      <Button onClick={onClickAddRecipyLine}>Add +</Button>
    </div>
  );
};
