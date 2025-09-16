import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/dashboardApi";
import Layout from "../../components/Layout";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getAdminDashboard();
      setStats(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-2xl">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Stores</h2>
          <p className="text-2xl">{stats.totalStores}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Ratings</h2>
          <p className="text-2xl">{stats.totalRatings}</p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;


