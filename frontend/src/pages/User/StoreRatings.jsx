import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import RatingForm from "../../components/RatingForm";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthContext";

const StoreRatings = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [store, setStore] = useState({});
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/ratings/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setStore(res.data.store);
      setRatings(res.data.ratings || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [id]);

  const handleRatingSubmit = (userRating, averageRating) => {
    setStore((prev) => ({ ...prev, userRating, averageRating }));

    setRatings((prev) => {
      const index = prev.findIndex((r) => r.user._id === user.id);
      if (index !== -1) {
        const updated = [...prev];
        updated[index].rating = userRating;
        return updated;
      } else {
        return [...prev, { _id: Date.now(), user, rating: userRating }];
      }
    });
  };

  if (loading) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{store.name} - Rate Store</h1>
      <p className="mb-2">Address: {store.address}</p>
      <p className="mb-4">Average Rating: {store.averageRating || 0}</p>

      {user ? (
        <RatingForm
          storeId={store._id}
          user={user}
          onRatingSubmit={handleRatingSubmit}
        />
      ) : (
        <p className="text-gray-500">Login to submit rating.</p>
      )}

      <h2 className="text-xl font-semibold mt-6 mb-2">All Ratings</h2>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">User</th>
            <th className="py-2 px-4">Rating</th>
          </tr>
        </thead>
        <tbody>
          {ratings.length > 0 ? (
            ratings.map((r) => (
              <tr key={r._id}>
                <td className="py-2 px-4">{r.user?.name || "Anonymous"}</td>
                <td className="py-2 px-4">{r.rating}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center py-4">
                No ratings yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
};

export default StoreRatings;







