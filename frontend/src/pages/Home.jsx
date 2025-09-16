import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Store Rating Platform</h1>
        <p className="mb-4">Login or Register to start rating stores!</p>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Register
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

