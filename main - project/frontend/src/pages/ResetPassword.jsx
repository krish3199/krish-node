import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !otp || !newPassword) {
      alert("All fields required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/reset-password", {
        email,
        otp,
        newPassword
      });
      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="p-10 text-center">
        <p>Email missing. Please try again.</p>
        <Link to="/forgot-password" className="text-primary underline">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-center mb-2">
          Verify OTP
        </h2>
        <p className="text-center text-gray-500 mb-6">
          OTP sent to <b>{email}</b>
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Verifying..." : "Reset Password"}
        </button>

        <p className="text-center text-sm mt-6 text-gray-500">
          Back to{" "}
          <Link to="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
