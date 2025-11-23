const { Pool } = require("pg");
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Check DB connection on startup
async function connectDB() {
    try {
       const client = await pool.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS links (
                id SERIAL PRIMARY KEY,
                code VARCHAR(8) UNIQUE NOT NULL,
                url TEXT NOT NULL,
                clicks INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT NOW(),
                last_clicked TIMESTAMP
            );
        `);
        console.log("PostgreSQL connected successfully");
    } catch (err) {
        console.error("PostgreSQL connection error:", err);
        process.exit(1);
    }
}
module.exports = { pool, connectDB };
