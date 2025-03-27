import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

interface Props {
  readonly children: React.ReactElement;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export const Modal = React.memo(({ children, isOpen, onClose }: Props) =>
  isOpen
    ? ReactDOM.createPortal(
        <div className="overlay">
          <div className="modal">
            <div className="header">
              <button onClick={onClose} className="closeButton">
                &times;
              </button>
            </div>
            {children}
          </div>
        </div>,
        document.querySelector("body") as Element
      )
    : null
);
