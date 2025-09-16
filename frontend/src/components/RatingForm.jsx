import { useState, useEffect } from "react";
import API from "../api/axios";

const RatingForm = ({ storeId, user, onRatingSubmit }) => {
  const [rating, setRating] = useState(0);
  const [average, setAverage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch ratings for store
  const fetchRatings = async () => {
    try {
      const res = await API.get(`/ratings/${storeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data) {
        setAverage(res.data.store.averageRating || 0);
        setTotal(res.data.ratings.length || 0);

        // Find user's rating if exists
        const userRatingObj = res.data.ratings.find(r => r.user._id === user?.id);
        if (userRatingObj) setRating(userRatingObj.rating);
      }
    } catch (err) {
      console.error("Failed to fetch ratings", err);
    }
  };

  // Submit or update rating
  const submitRating = async (value) => {
    if (!storeId) return;

    try {
      setLoading(true);
      const res = await API.post(
        `/ratings/${storeId}`,
        { rating: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRating(value);
      setAverage(res.data.averageRating);
      if (onRatingSubmit) onRatingSubmit(value, res.data.averageRating);

      fetchRatings(); // refresh ratings
    } catch (err) {
      console.error("Failed to submit rating", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [storeId]);

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="font-bold text-lg mb-2">Rate this Store</h3>
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            disabled={loading}
            onClick={() => submitRating(star)}
            className={`px-3 py-1 rounded ${
              rating === star ? "bg-yellow-400 text-white" : "bg-gray-200"
            }`}
          >
            {star} ⭐
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-600">
        Average Rating: <span className="font-semibold">{average} ⭐ ({total} ratings)</span>
      </p>
    </div>
  );
};

export default RatingForm;




