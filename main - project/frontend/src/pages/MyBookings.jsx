import { useEffect, useState } from "react";
import { getMyBookings, cancelBooking } from "../services/bookingService";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      const data = await getMyBookings();
      setBookings(data.bookings || data);
      setLoading(false);
    };

    loadBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    await cancelBooking(id);
    setBookings((prev) => prev.filter((b) => b._id !== id));
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 && (
        <p className="text-gray-500">No bookings found</p>
      )}

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{b.hotelId?.name}</p>
              <p className="text-sm text-gray-500">
                {b.roomType} | {b.days} nights
              </p>
              <p className="text-sm">₹{b.totalPrice}</p>
            </div>

            <button
              onClick={() => handleCancel(b._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
