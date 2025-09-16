const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Test connection immediately
pool.connect()
    .then(client => {
        console.log('Connected to PostgreSQL');
        client.release(); // release back to pool
    })
    .catch(err => {
        console.error('Database connection error:', err.stack);
    });

module.exports = pool;
