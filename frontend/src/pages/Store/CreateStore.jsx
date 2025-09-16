import { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout"; // import Layout

const CreateStore = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await API.post("/stores", formData);
      setSuccess("Store created successfully!");
      setFormData({ name: "", email: "", address: "" });
      navigate("/admin/stores");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create store");
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Create Store</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded shadow">
        <input
          type="text"
          name="name"
          placeholder="Store Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Store Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          name="address"
          placeholder="Store Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Store
        </button>
      </form>
    </Layout>
  );
};

export default CreateStore;

