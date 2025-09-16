import { useEffect, useState } from "react";
import { getAllStores } from "../../api/storeApi";
import Layout from "../../components/Layout"; // import Layout

const ManageStores = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await getAllStores();
      setStores(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Manage Stores</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Address</th>
              <th className="border p-2 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((s) => (
              <tr key={s._id} className="hover:bg-gray-50">
                <td className="border p-2">{s.name}</td>
                <td className="border p-2">{s.email}</td>
                <td className="border p-2">{s.address}</td>
                <td className="border p-2">{s.averageRating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ManageStores;


