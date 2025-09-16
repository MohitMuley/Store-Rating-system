import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import RatingForm from "../../components/RatingForm";
import { AuthContext } from "../../context/AuthContext";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [filter, setFilter] = useState("");
  const { user } = useContext(AuthContext);

  const fetchStores = async () => {
    try {
      const res = await API.get("/stores", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setStores(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleRatingSubmit = (storeId, userRating, averageRating) => {
    setStores((prev) =>
      prev.map((store) =>
        store._id === storeId
          ? { ...store, userRating, averageRating }
          : store
      )
    );
  };

  const filteredStores = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(filter.toLowerCase()) ||
      s.address.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Stores</h1>
      <input
        type="text"
        placeholder="Search by name or address"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStores.map((store) => (
          <div key={store._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{store.name}</h2>
            <p className="mb-2">{store.address}</p>
            <p className="mb-2">Overall Rating: {store.averageRating || 0}</p>
            <p className="mb-2">
              Your Rating: {store.userRating || "Not rated"}
            </p>

            {user && (
              <RatingForm
                storeId={store._id}
                user={user}
                onRatingSubmit={(rating, average) =>
                  handleRatingSubmit(store._id, rating, average)
                }
              />
            )}

            <Link
              to={`/stores/${store._id}`}
              className="text-blue-600 hover:underline mt-2 block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;




