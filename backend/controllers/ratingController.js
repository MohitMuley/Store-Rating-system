const Rating = require('../models/Rating');
const Store = require('../models/Store'); // assuming you have this for fetching store details

// Submit or update rating
exports.submitRating = async (req, res) => {
  const { rating } = req.body;
  const storeId = req.params.storeId; // from URL
  const userId = req.user.id;

  if (rating < 1 || rating > 5) 
    return res.status(400).json({ message: 'Rating must be 1-5' });

  try {
    // Upsert rating (create or update)
    const submitted = await Rating.create({ userId, storeId, rating });

    // Get updated average rating
    const averageRating = await Rating.getAverageRating(storeId);

    res.json({
      message: 'Rating submitted',
      rating: submitted,
      averageRating,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get ratings for a store
exports.getRatingsByStore = async (req, res) => {
  const storeId = req.params.id;

  try {
    // Fetch store details
    const store = await Store.findById(storeId);
    if (!store) return res.status(404).json({ message: "Store not found" });

    // Fetch ratings
    const ratingsRaw = await Rating.getRatingsByStore(storeId);
    const averageRating = await Rating.getAverageRating(storeId);

    // Format ratings
    const ratings = ratingsRaw.map((r) => ({
      id: r.id,
      rating: r.rating,
      createdAt: r.created_at,
      user: { id: r.user_id, name: r.user_name },
    }));

    res.json({
      store: {
        id: store.id,
        name: store.name,
        address: store.address,
        averageRating,
      },
      ratings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

