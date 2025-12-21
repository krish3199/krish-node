import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-4">
          <Link to="/admin" className="block hover:text-blue-400">
            Dashboard
          </Link>
          <Link to="/admin/hotels" className="block hover:text-blue-400">
            Hotels
          </Link>
          <Link to="/admin/hotels/add" className="block hover:text-blue-400">
            Add Hotel
          </Link>
          <Link to="/admin/bookings" className="block hover:text-blue-400">
            Bookings
          </Link>
          <Link to="/admin/users" className="block hover:text-blue-400">
            Users
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
