import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import StatsPage from "./pages/StatsPage";
import RedirectPage from "./pages/RedirectPage";
import HealthPage from "./pages/HealthPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6">
        <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/code/:code" element={<StatsPage />} />
            <Route path="/healthz" element={<HealthPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
