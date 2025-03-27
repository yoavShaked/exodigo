import React from "react";

export const Detail = React.memo(
  ({
    label,
    value,
  }: {
    readonly label: string;
    readonly value: React.ReactNode;
  }) => (
    <div className="detail">
      <label className="titel">{label}</label>
      <div className="value">{value}</div>
    </div>
  )
);
