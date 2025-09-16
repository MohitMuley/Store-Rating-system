import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children, store }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar store={store} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

