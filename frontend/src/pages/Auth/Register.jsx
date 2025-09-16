import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { handleRegister } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",   // Added address field
    role: "user",  // default role
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");   // Clear previous errors
    setSuccess(""); // Clear previous success messages
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await handleRegister(formData);
      setSuccess("Registration successful! Redirecting to login...");
      setFormData({ name: "", email: "", password: "", address: "", role: "user" });

      // Redirect after 1.5 seconds
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-400"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-400"
          required
        />

        {/* NEW: Address field */}
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-400"
          required
        />

        {/* Role selection */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-400"
        >
          <option value="user">User</option>
          <option value="storeOwner">Store Owner</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          Register
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;

