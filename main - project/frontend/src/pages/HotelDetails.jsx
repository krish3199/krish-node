import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getHotelById } from "../services/hotelService";

export default function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHotelById(id).then((data) => {
      setHotel(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="p-10">Loading...</p>;
  if (!hotel) return <p className="p-10">Hotel not found</p>;

  const price = hotel.rooms?.[0]?.price || 2500;
  const stars = hotel.stars || 4;

  return (
    <div className="min-h-screen px-6 md:px-10 py-10">
      {/* HERO */}
      <div
        data-aos="fade-up"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left: Images + Info */}
        <div className="lg:col-span-2">
          {/* Main Image */}
          <img
            src={hotel.image || "https://source.unsplash.com/1200x600/?hotel,resort"}
            alt={hotel.name}
            className="w-full h-80 object-cover rounded-2xl mb-6"
          />

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            {hotel.name}
          </h1>

          {/* Location + Stars */}
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 mb-4">
            <span>{hotel.city}</span>
            <span>•</span>
            <span className="text-yellow-400">
              {"★".repeat(stars)}
              <span className="text-gray-300">
                {"★".repeat(5 - stars)}
              </span>
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            {hotel.description ||
              "Experience luxury and comfort at this premium hotel with world-class amenities and excellent service."}
          </p>

          {/* AMENITIES */}
          <div data-aos="fade-up">
            <h3 className="text-2xl font-bold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Free WiFi",
                "Swimming Pool",
                "Restaurant",
                "Parking",
                "24x7 Service",
                "AC Rooms",
              ].map((a) => (
                <div
                  key={a}
                  className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow text-center"
                >
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Booking Card */}
        <div
          data-aos="fade-left"
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 h-fit sticky top-24"
        >
          <p className="text-xl font-bold mb-2">
            ₹{price} <span className="text-sm font-normal">/ night</span>
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Taxes included • Free cancellation
          </p>

          <Link
            to={`/booking/${hotel._id}`}
            className="block w-full text-center bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Book Now
          </Link>

          <p className="text-xs text-center mt-4 text-gray-400">
            No payment required now
          </p>
        </div>
      </div>
    </div>
  );
}
