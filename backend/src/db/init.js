require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function runSchema() {
    try {
        console.log('Connecting to database...');
        const sqlPath = path.join(__dirname, '../../../database/schema.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        
        console.log('Executing schema...');
        await pool.query(sql);
        console.log('Database schema created and seeded successfully!');
    } catch (err) {
        console.error('Error executing schema:', err);
    } finally {
        await pool.end();
    }
}

runSchema();
