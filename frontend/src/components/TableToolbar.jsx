import React from "react";

export default function TableToolbar({ count }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="text-sm text-slate-600">{count} result{count !== 1 ? "s" : ""}</div>
      <div className="text-xs text-slate-500">
        Tip: click <span className="font-medium">Copy</span> to copy redirect URL
      </div>
    </div>
  );
}
