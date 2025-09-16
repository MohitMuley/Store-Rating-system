import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  if (!user) return null;

  let links = [];

  if (user.role === "admin") {
    links = [
      { name: "Dashboard", to: "/admin/dashboard" },
      { name: "Manage Users", to: "/admin/users" },
      { name: "Manage Stores", to: "/admin/stores" },
      { name: "Create Store", to: "/admin/create-store" },
    ];
  } else if (user.role === "storeOwner") {
    links = [
      { name: "Dashboard", to: `/owner/dashboard/${user.storeId || 1}` },
    ];
  } else if (user.role === "user" || user.role === "normal") {
    links = [
      { name: "Profile", to: "/profile" },
      { name: "Stores", to: "/stores" },
      { name: "Update Password", to: "/update-password" },
    ];
  }

  return (
    <aside className="w-64 bg-gray-100 min-h-screen p-4">
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="block px-3 py-2 rounded hover:bg-gray-200"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

