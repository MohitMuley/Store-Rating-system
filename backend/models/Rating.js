const pool = require('../utils/db');

class Rating {
    static async create({ userId, storeId, rating }) {
        const existing = await pool.query('SELECT * FROM ratings WHERE user_id=$1 AND store_id=$2', [userId, storeId]);
        if (existing.rows.length > 0) {
            return await pool.query('UPDATE ratings SET rating=$1 WHERE user_id=$2 AND store_id=$3 RETURNING *', [rating, userId, storeId]).then(r => r.rows[0]);
        }
        const result = await pool.query('INSERT INTO ratings (user_id, store_id, rating) VALUES ($1,$2,$3) RETURNING *', [userId, storeId, rating]);
        return result.rows[0];
    }

    static async getAverageRating(storeId) {
        const result = await pool.query(
            "SELECT COALESCE(ROUND(AVG(rating), 1), 0) as avg_rating FROM ratings WHERE store_id=$1",
            [storeId]
        );
        return parseFloat(result.rows[0].avg_rating);
    }

    static async getRatingsByStore(storeId) {
        const result = await pool.query(
            `SELECT r.id, r.rating, r.user_id, r.created_at, u.name as user_name
     FROM ratings r
     JOIN users u ON r.user_id = u.id
     WHERE r.store_id = $1
     ORDER BY r.created_at DESC`,
            [storeId]
        );
        return result.rows;
    }


}

module.exports = Rating;
