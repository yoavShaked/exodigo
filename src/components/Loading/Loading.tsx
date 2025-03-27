import React from "react";
import "./index.css";

export const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
