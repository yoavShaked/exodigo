import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

export interface ActivateToastProps {
  readonly type: "success" | "error";
  readonly message: React.ReactNode;
  readonly duration?: number;
  readonly id: string;
}

export const useActivateToast = () => {
  const [toastProps, setToastProps] = React.useState<ActivateToastProps | null>(
    null
  );
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const activate = React.useCallback(
    ({ type, message, duration = 3000, id }: ActivateToastProps) => {
      setToastProps({
        type,
        message,
        duration,
        id,
      });
      timerRef.current = setTimeout(() => {
        setToastProps(null);
      }, duration);
    },
    []
  );

  return [toastProps, activate] as const;
};

interface Props {
  readonly type: "success" | "error";
  readonly message: React.ReactNode;
  readonly duration?: number;
  readonly visible: boolean;
}

export const Toast = React.memo(({ type, message, visible }: Props) => {
  return ReactDOM.createPortal(
    <div className="toast-container">
      {visible && (
        <div
          className={`toast-item ${type} ${visible ? "slideUp" : "slideDown"}`}
        >
          {message}
        </div>
      )}
    </div>,
    document.body
  );
});
