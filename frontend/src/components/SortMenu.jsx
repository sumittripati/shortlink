import React from "react";

export default function SortMenu({ sortKey, sortDir, onChange }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <select value={sortKey} onChange={(e) => onChange(e.target.value, sortDir)} className="border rounded px-2 py-1 text-sm">
        <option value="created_at">Newest</option>
        <option value="clicks">Clicks</option>
        <option value="code">Code</option>
      </select>
      <button onClick={() => onChange(sortKey, sortDir === "asc" ? "desc" : "asc")} className="px-2 py-1 border rounded">
        {sortDir === "asc" ? "↑" : "↓"}
      </button>
    </div>
  );
}
