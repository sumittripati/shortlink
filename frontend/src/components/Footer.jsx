import React from "react";
export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white mt-10 shadow-inner">
      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-white/90">
          ©{new Date().getFullYear()} <span className="font-semibold">Shortly UI</span> — Demo Project
        </div>
        <div className="text-white/80">Built with by <span className="font-semibold">Sumit Tripathi</span></div>
      </div>
    </footer>
  );
}
