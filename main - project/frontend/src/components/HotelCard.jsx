import { Link } from "react-router-dom";

export default function HotelCard({ hotel }) {
  return (
    <div
      data-aos="fade-up"
      className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow hover:shadow-xl transition-all"
    >
      {/* Image */}
      <img
        src={hotel.image || "https://source.unsplash.com/600x400/?hotel"}
        alt={hotel.name}
        className="h-52 w-full object-cover"
      />

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-1">{hotel.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {hotel.city}
        </p>

        {/* Stars */}
        <div className="flex my-2">
          {"★".repeat(hotel.stars || 4)}
          <span className="text-gray-300">
            {"★".repeat(5 - (hotel.stars || 4))}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex justify-between items-center mt-4">
          <p className="font-bold text-lg">
            ₹{hotel.rooms?.[0]?.price || 2500}
            <span className="text-sm font-normal"> / night</span>
          </p>

          <Link
            to={`/hotels/${hotel._id}`}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
