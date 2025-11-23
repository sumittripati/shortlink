import React from "react";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4 sm:p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">S</div>
          <div>
            <div className="font-semibold">Shortly UI</div>
            <div className="text-sm text-slate-500">Clean short-link management</div>
          </div>
        </Link>
        <nav className="flex items-center gap-3">
          <NavLink to="/">Dashboard</NavLink>
           <NavLink to="/healthz">Health</NavLink>
        </nav>
      </div>
    </header>
  );
}


