import { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    try {
      await API.put("/users/update-password", {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      setMessage("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Update Password</h1>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-white p-6 rounded shadow"
      >
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Password
        </button>
      </form>
    </Layout>
  );
};

export default UpdatePassword;


