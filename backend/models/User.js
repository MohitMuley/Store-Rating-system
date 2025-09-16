const pool = require('../utils/db');
const bcrypt = require('bcryptjs');

class User {
    static async create({ name, email, password, address, role }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (name, email, password, address, role) VALUES ($1,$2,$3,$4,$5) RETURNING *',
            [name, email, hashedPassword, address, role]
        );
        return result.rows[0];
    }

    static async findByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
        return result.rows[0] || null;
    }

    static async getAll(filters = {}) {
        let query = 'SELECT id, name, email, address, role FROM users';
        const values = [];
        const conditions = [];

        if (filters.name) { conditions.push(`name ILIKE $${values.length + 1}`); values.push(`%${filters.name}%`); }
        if (filters.email) { conditions.push(`email ILIKE $${values.length + 1}`); values.push(`%${filters.email}%`); }
        if (filters.address) { conditions.push(`address ILIKE $${values.length + 1}`); values.push(`%${filters.address}%`); }
        if (filters.role) { conditions.push(`role=$${values.length + 1}`); values.push(filters.role); }

        if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');

        const result = await pool.query(query, values);
        return result.rows;
    }

    static async updatePassword(id, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const result = await pool.query(
            "UPDATE users SET password=$1 WHERE id=$2 RETURNING id, email, role",
            [hashedPassword, id]
        );
        return result.rows[0];
    }


}

module.exports = User;
