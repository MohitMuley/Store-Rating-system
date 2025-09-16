const Store = require('../models/Store');
const Rating = require('../models/Rating');

exports.createStore = async (req, res) => {
    try {
        const { name, email, address } = req.body;

        // Create store without ownerId
        const store = await Store.create({ name, email, address });

        res.status(201).json(store);
    } catch (err) {
        console.error("Create store error:", err);
        res.status(500).json({ message: "Failed to create store" });
    }
};


exports.getAllStores = async (req, res) => {
    const filters = req.query;
    const stores = await Store.getAll(filters);

    const normalized = stores.map(s => ({
        _id: s.id,
        name: s.name,
        email: s.email,
        address: s.address,
        averageRating: s.average_rating ?? "N/A"
    }));

    res.json(normalized);
};


exports.getStoreById = async (req, res) => {
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ message: 'Store not found' });

    const avgRating = await Rating.getAverageRating(store.id);

    // ✅ Normalize here too
    res.json({
        store: { _id: store._id || store.id, ...store },
        averageRating: avgRating
    });
};
