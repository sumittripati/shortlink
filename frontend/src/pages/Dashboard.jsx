import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SortMenu from "../components/SortMenu";
import TableToolbar from "../components/TableToolbar";
import EmptyState from "../components/EmptyState";
import LoadingBox from "../components/LoadingBox";

import {getAllLinks, createShortLink, deleteLink} from "../utils/api";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Load on startup
  useEffect(() => {
    async function load() {
      try {
        const data = await getAllLinks();
        setLinks(data);
      } catch (e) {
        setErrorMsg("Failed to load links");
      }
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const fresh = await getAllLinks();
        setLinks(fresh);
      } catch {}
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ---------- CREATE NEW LINK ----------
  async function handleCreate(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    const raw = url || "";
    const normalized = raw.trim().replace(/\/+$/, "");
    if (!normalized) {
      setErrorMsg("Please enter a URL");
      return;
    }
    try {
      new URL(normalized);
    } catch {
      setErrorMsg("Please enter a valid URL including https://");
      return;
    }
    const exists = links.some((l) => l.url.toLowerCase().replace(/\/+$/, "") === normalized.toLowerCase());
    if (exists) {
      setErrorMsg("This URL already exists in your list.");
      return;
    }
    setCreating(true);
    const result = await createShortLink(normalized);
    if (result.error) {
      setErrorMsg(result.error);
      setCreating(false);
      return;
    }
    setLinks((prev) => [result, ...prev]);
    setUrl("");
    toast.success("Short link created!");
    setCreating(false);
  }

  // -------- DELETE LINK ----------
  async function handleDeleteLink(code) {
  const confirm = await Swal.fire({
    title: "Delete link?",
    text: "Are you sure you want to delete this short link?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete",
  });

  if (!confirm.isConfirmed) return;
  await deleteLink(code);
  setLinks((prev) => prev.filter((l) => l.code !== code));
  toast.success("Link deleted!");
}

  // -------- FILTER + SORT --------
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = links.filter((l) => !q || l.code.toLowerCase().includes(q) || l.url.toLowerCase().includes(q));
    arr = arr.sort((a, b) => {
      let A = a[sortKey];
      let B = b[sortKey];
      if (sortKey === "clicks") {
        A = +A;
        B = +B;
      }
      if (A < B) return sortDir === "asc" ? -1 : 1;
      if (A > B) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [links, query, sortDir, sortKey]);

  // copy text
  function copyText(text) {
    navigator.clipboard.writeText(text);
    toast.success("Link copied!");
  }

  if (loading) return <LoadingBox message="Loading links..." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-slate-600">Manage short links from backend API.</p>
        </div>
        <div className="flex items-center gap-3">
          <input value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search code or URL" 
          className="border rounded px-3 py-2 text-sm w-56"/>
          <SortMenu sortKey={sortKey} sortDir={sortDir} onChange={(k, d) => {setSortKey(k); setSortDir(d); }}/>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border rounded p-4">
          <h2 className="font-semibold mb-3">Short Links</h2>
          <TableToolbar count={filtered.length} />
          {filtered.length === 0 ? (<EmptyState />) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm table-auto">
                <thead>
                  <tr className="text-left text-slate-500 border-b">
                    <th className="py-2">Code</th>
                    <th className="py-2">URL</th>
                    <th className="py-2">Clicks</th>
                    <th className="py-2">Created</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr key={row.id} className="border-b hover:bg-slate-50">
                      <td className="py-3 font-medium">{row.code}</td>
                      <td className="py-3 max-w-[40ch] truncate">{row.url}</td>
                      <td className="py-3">{row.clicks}</td>
                      <td className="py-3 text-slate-500 text-xs">
                        {new Date(row.created_at).toLocaleString()}
                      </td>
                      <td className="py-2">
                        <div className="flex gap-2 items-center">
                          <button onClick={() => copyText(`https://shortlink-olh3.onrender.com/${row.code}`)}
                            className="px-2 py-1 bg-green-50 text-green-700 rounded cursor-pointer">
                            Copy
                          </button>
                          <Link to={`/code/${row.code}`} 
                            className="px-3 py-1.5 rounded-lg bg-indigo-100 text-indigo-700  hover:bg-indigo-200 transition font-medium shadow-sm">
                            Stats
                          </Link>
                          <button onClick={() => handleDeleteLink(row.code)} 
                            className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700  hover:bg-rose-100 transition font-medium shadow-sm cursor-pointer">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="bg-white border rounded p-4">
          <h3 className="font-semibold mb-2">Create a new short link</h3>
          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="text-sm">URL</label>
              <input disabled={creating} value={url} onChange={(e) => { setUrl(e.target.value); if (errorMsg) setErrorMsg(""); if (successMsg) setSuccessMsg(""); }} className="mt-1 w-full border rounded px-3 py-2 text-sm" placeholder="https://example.com/page"/>
            </div>
            <button disabled={creating} className="px-4 py-2 bg-indigo-600 text-white rounded">
              {creating ? "Creating..." : "Create"}
            </button>
          </form>
          {errorMsg && (
            <div className="text-sm text-rose-700 mt-2">{errorMsg}</div>
          )}
          {successMsg && (
            <div className="text-sm text-green-700 mt-2">{successMsg}</div>
          )}
        </div>
      </div>
    </div>
  );
}

