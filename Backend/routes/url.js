const express = require("express");
const router = express.Router();
const { createShortURL, getAllLinks, getLinkByCode, deleteLink, redirectToURL, healthCheck } = require("../controllers/urlcontroller");

// API routes
router.post("/links", createShortURL);
router.get("/links", getAllLinks);
router.get("/links/:code", getLinkByCode);
router.delete("/links/:code", deleteLink);
router.get("/healthz", healthCheck);
router.get("/:code", redirectToURL);

module.exports = router;
