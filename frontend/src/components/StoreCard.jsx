import { Link } from "react-router-dom";

const StoreCard = ({ store }) => {
  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">{store.name}</h2>
      <p className="mb-2">{store.address}</p>
      <p className="mb-2">Rating: {store.rating || "Not rated"}</p>
      <Link
        to={`/stores/${store.id}`}
        className="text-blue-600 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
};

export default StoreCard;
