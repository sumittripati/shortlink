import React from "react";

export default function ErrorBox({ message }) {
  return (
    <div className="bg-rose-50 border border-rose-100 rounded p-4 text-rose-700">
      {message}
    </div>
  );
}
