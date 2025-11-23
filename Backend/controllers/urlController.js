const generateCode = require("../utils/generateCode");
const { pool } = require('../config/db');

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}
// 1.1 get short url
exports.createShortURL =
    async (req, res) => {
        try {
            let { url } = req.body;
            let code = generateCode();   

            if (!url) return res.status(400).json({ error: "URL is required" });
            if (!isValidUrl(url)) return res.status(400).json({ error: "Invalid URL" });

            // Check if auto-generated code is valid format
            const pattern = /^[A-Za-z0-9]{6,8}$/;
            if (!pattern.test(code)) {
                return res.status(400).json({ error: "Invalid auto-generated code format" });
            }

            let exists = await pool.query("SELECT * FROM links WHERE code=$1", [code]);

            while (exists.rowCount > 0) {
                code = generateCode();
                exists = await pool.query("SELECT * FROM links WHERE code=$1", [code]);
            }

            // Insert into DB
            const result = await pool.query(
                "INSERT INTO links (code, url) VALUES ($1, $2) RETURNING *",
                [code, url]
            );

            return res.status(201).json(result.rows[0]);

        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: "Server error" });
        }
    };


// 1.2 GET /api/links
exports.getAllLinks = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM links ORDER BY created_at DESC");
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// 1.3 GET /api/links/:code
exports.getLinkByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const result = await pool.query("SELECT * FROM links WHERE code=$1", [code]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Code not found" });
        }

        res.status(200).json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// 1.4 DELETE /api/links/:code
exports.deleteLink = async (req, res) => {
    try {
        const { code } = req.params;

        const result = await pool.query(
            "DELETE FROM links WHERE code=$1 RETURNING *",
            [code]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Code not found" });
        }

        return res.status(204).json({
            succress: true,
            message: "Link deleted successfully",
            data: result.rows[0]
        })

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// 1.5 GET /:code → Redirect
exports.redirectToURL = async (req, res) => {
    try {
        const { code } = req.params;

        const result = await pool.query(
            "SELECT * FROM links WHERE code=$1",
            [code]
        );

        if (result.rowCount === 0) {
            return res.status(404).send("Not Found");
        }

        const link = result.rows[0];

        await pool.query(
            "UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code=$1",
            [code]
        );

        return res.redirect(302, link.url);

    } catch (err) {
        res.status(500).send("Server error");
    }
};

// 1.6 Health Check
exports.healthCheck = (req, res) => {
    res.status(200).json({ ok: true });
};
