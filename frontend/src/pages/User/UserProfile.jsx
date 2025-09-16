import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Layout from "../../components/Layout";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="bg-white p-6 rounded shadow max-w-md">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
    </Layout>
  );
};

export default UserProfile;
