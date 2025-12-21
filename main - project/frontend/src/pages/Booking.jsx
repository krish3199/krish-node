import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Booking() {
  const { id } = useParams(); // hotelId
  const [searchParams] = useSearchParams();
  const roomType = searchParams.get("room");
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [price, setPrice] = useState(0);
  const [days, setDays] = useState(0);
  const [loading, setLoading] = useState(false);

  // 👉 TEMP: price fetch (later improve)
  useEffect(() => {
    // Simple fallback price; backend already recalculates securely
    setPrice(1500);
  }, []);

  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diff =
        Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 0;
      setDays(diff > 0 ? diff : 0);
    }
  }, [checkIn, checkOut]);

  const total = days * price;

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      alert("Select dates");
      return;
    }

    try {
      setLoading(true);
      await api.post("/bookings/create", {
        hotelId: id,
        roomType,
        checkIn,
        checkOut
      });
      alert("Booking successful 🎉");
      navigate("/my-bookings");
    } catch {
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Confirm Booking</h2>

      <div className="space-y-4">
        <p className="font-semibold">Room: {roomType}</p>

        <input
          type="date"
          className="border p-3 w-full rounded"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />

        <input
          type="date"
          className="border p-3 w-full rounded"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />

        {days > 0 && (
          <div className="bg-gray-100 p-4 rounded">
            <p>Nights: {days}</p>
            <p className="font-bold">Total: ₹{total}</p>
          </div>
        )}

        <button
          onClick={handleBooking}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
