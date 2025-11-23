import React from "react";

export default function StatCard({ title, value }) {
  return (
    <div className="bg-white border rounded p-4 flex flex-col">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 font-bold text-2xl">{value}</div>
    </div>
  );
}
