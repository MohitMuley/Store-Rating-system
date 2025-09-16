import { useEffect, useState } from "react";
import { getStoreDashboard } from "../../api/storeApi"; 
import Layout from "../../components/Layout";

const StoreOwnerDashboard = () => {
  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getStoreDashboard(); // no id
      console.log("API response:", res.data);

      setStore(res.data.store || null);
      setRatings(res.data.ratings || []);
    } catch (err) {
      console.error(err.response?.data || err);
      setStore(null);
      setRatings([]);
    }
  };

  return (
    <Layout store={store}>
      <h1 className="text-3xl font-bold mb-4">Store Owner Dashboard</h1>

      {/* Store Info */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Store Info</h2>
        {store ? (
          <div className="space-y-1">
            <p><strong>Name:</strong> {store.name}</p>
            <p><strong>Email:</strong> {store.email}</p>
            <p><strong>Address:</strong> {store.address}</p>
            <p><strong>Average Rating:</strong> ⭐ {store.averageRating ?? "-"}</p>
          </div>
        ) : (
          <p>Loading store info...</p>
        )}
      </div>

      {/* User Ratings */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">User Ratings</h2>
        {ratings && ratings.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {ratings.map((r) => (
              <li key={r.id} className="py-2">
                <p><strong>User:</strong> {r.user_name || "Unknown"}</p>
                <p><strong>Rating:</strong> ⭐ {r.rating ?? "-"}</p>
                {r.created_at && (
                  <p className="text-sm text-gray-500">
                    {new Date(r.created_at).toLocaleDateString()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No ratings yet.</p>
        )}
      </div>
    </Layout>
  );
};

export default StoreOwnerDashboard;








