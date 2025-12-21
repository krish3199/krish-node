import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        BookMyTrip
      </Link>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-sm">
              Hi, {user.name || "User"}
            </span>

            <Link to="/my-bookings">My Bookings</Link>

            <button
              onClick={handleLogout}
              className="px-4 py-1 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link
              to="/signup"
              className="px-4 py-1 bg-blue-600 text-white rounded"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
