import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageStores from "./pages/Admin/ManageStores";
import OwnerDashboard from "./pages/StoreOwner/OwnerDashboard";
import StoreList from "./pages/Store/StoreList";
import StoreDetails from "./pages/Store/StoreDetails";
import CreateStore from "./pages/Store/CreateStore";
import StoreRatings from "./pages/User/StoreRatings";
import UserProfile from "./pages/User/UserProfile";
import UpdatePassword from "./pages/User/UpdatePassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout"; // Layout includes Navbar + Sidebar

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["user", "normal"]}>
              <Layout><UserProfile /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-password"
          element={
            <ProtectedRoute allowedRoles={["user", "normal"]}>
              <Layout><UpdatePassword /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/stores"
          element={
            <ProtectedRoute allowedRoles={["user", "normal"]}>
              <Layout><StoreList /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/stores/:id"
          element={
            <ProtectedRoute allowedRoles={["user", "normal"]}>
              <Layout><StoreDetails /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ratings/:id"
          element={
            <ProtectedRoute allowedRoles={["user", "normal"]}>
              <Layout><StoreRatings /></Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout><AdminDashboard /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout><ManageUsers /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/stores"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout><ManageStores /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-store"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout><CreateStore /></Layout>
            </ProtectedRoute>
          }
        />

        {/* Store Owner */}
        <Route
          path="/owner/dashboard/:id"
          element={
            <ProtectedRoute allowedRoles={["storeOwner"]}>
              <Layout><OwnerDashboard /></Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


