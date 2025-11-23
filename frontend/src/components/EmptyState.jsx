import React from "react";

export default function EmptyState() {
  return (
    <div className="p-8 text-center text-slate-500">
      <div className="text-xl font-semibold mb-2">No short links yet</div>
      <div className="text-sm">
        Create your first short code on the right. The table will appear here.
      </div>
    </div>
  );
}
