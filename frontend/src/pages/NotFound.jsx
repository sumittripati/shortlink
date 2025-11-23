import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h2 className="text-3xl font-bold">404 — Not found</h2>
      <p className="mt-2 text-slate-600">
        The page you requested does not exist.{" "}
        <Link to="/" className="underline">
          Go home
        </Link>
      </p>
    </div>
  );
}
