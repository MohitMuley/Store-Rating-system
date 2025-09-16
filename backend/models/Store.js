const pool = require('../utils/db');

class Store {
    static async create({ name, email, address }) {
        const result = await pool.query(
            'INSERT INTO stores (name, email, address) VALUES ($1,$2,$3) RETURNING *',
            [name, email, address]
        );
        return result.rows[0];
    }

    static async getAll(filters = {}) {
        let query = `
        SELECT 
            s.id, s.name, s.email, s.address,
            COALESCE(ROUND(AVG(r.rating), 1), NULL) AS average_rating
        FROM stores s
        LEFT JOIN ratings r ON s.id = r.store_id
        `;
        const values = [];
        const conditions = [];

        if (filters.name) {
            conditions.push(`s.name ILIKE $${values.length + 1}`);
            values.push(`%${filters.name}%`);
        }
        if (filters.address) {
            conditions.push(`s.address ILIKE $${values.length + 1}`);
            values.push(`%${filters.address}%`);
        }

        if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
        query += ' GROUP BY s.id';

        const result = await pool.query(query, values);
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM stores WHERE id=$1', [id]);
        return result.rows[0];
    }

    static async findByOwner(ownerId) {
        const result = await pool.query('SELECT * FROM stores WHERE owner_id=$1', [ownerId]);
        return result.rows[0];
    }
}

module.exports = Store;

