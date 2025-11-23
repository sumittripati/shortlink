// require('dotenv').config()
const BASE_URL = import.meta.env.VITE_BASE_URL || "https://shortlink-olh3.onrender.com/api";

// -------- GET all links --------
export async function getAllLinks() {
  const res = await fetch(`${BASE_URL}/links`);
  return res.json();
}

// -------- CREATE short link --------
export async function createShortLink(url) {
  const res = await fetch(`${BASE_URL}/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  return res.json();
}

// -------- GET single link stats --------
export async function getLinkStats(code) {
  const res = await fetch(`${BASE_URL}/links/${code}`);
  return res.json();
}

// -------- DELETE link --------
export async function deleteLink(code) {
  return fetch(`${BASE_URL}/links/${code}`, {
    method: "DELETE",
  });
}

