import React from "react";
import { Link } from "react-router-dom";

export default function NavLink({ to, children }) {
  return (
    <Link to={to} className="text-sm px-3 py-2 rounded hover:bg-slate-100">
      {children}
    </Link>
  );
}
