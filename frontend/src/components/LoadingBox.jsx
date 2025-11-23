import React from "react";

export default function LoadingBox({ message = "Loading..." }) {
  return (
    <div className="bg-white border rounded p-6 text-center">
      <div className="animate-pulse text-slate-500">{message}</div>
    </div>
  );
}
