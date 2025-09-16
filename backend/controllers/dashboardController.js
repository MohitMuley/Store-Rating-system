const User = require('../models/user');
const Store = require('../models/Store');
const Rating = require('../models/Rating');
const pool = require('../utils/db');

exports.adminDashboard = async (req, res) => {
  try {
    // Instead of fetching ALL users/stores (inefficient), just count
    const users = await pool.query("SELECT COUNT(*) FROM users");
    const stores = await pool.query("SELECT COUNT(*) FROM stores");
    const ratings = await pool.query("SELECT COUNT(*) FROM ratings");

    res.json({
      totalUsers: parseInt(users.rows[0].count, 10),
      totalStores: parseInt(stores.rows[0].count, 10),
      totalRatings: parseInt(ratings.rows[0].count, 10),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
};

exports.storeOwnerDashboard = async (req, res) => {
  try {
    // Get all stores
    const stores = await Store.getAll();
    if (!stores.length) {
      return res.status(404).json({ message: "No stores found" });
    }

    // Pick the first store
    const firstStore = stores[0];

    const avgRating = await Rating.getAverageRating(firstStore.id);
    const ratings = await Rating.getRatingsByStore(firstStore.id);

    res.json({
      store: {
        id: firstStore.id,
        name: firstStore.name,
        email: firstStore.email,
        address: firstStore.address,
        averageRating: avgRating,
      },
      ratings,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard" });
  }
};



