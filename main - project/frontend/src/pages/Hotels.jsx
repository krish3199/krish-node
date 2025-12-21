import { useEffect, useMemo, useState } from "react";
import { getAllHotels } from "../services/hotelService";
import HotelCard from "../components/HotelCard";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [city, setCity] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [stars, setStars] = useState("");

  // Fetch hotels
  useEffect(() => {
    getAllHotels().then((data) => setHotels(data || []));
  }, []);

  // Filter logic
  const filteredHotels = useMemo(() => {
    return hotels.filter((h) => {
      const cityOk =
        !city || h.city?.toLowerCase().includes(city.toLowerCase());

      const priceOk =
        !maxPrice || (h.rooms?.[0]?.price || 0) <= Number(maxPrice);

      const starsOk = !stars || Number(h.stars) === Number(stars);

      return cityOk && priceOk && starsOk;
    });
  }, [hotels, city, maxPrice, stars]);

  return (
    <div className="min-h-screen px-6 md:px-10 py-10">
      {/* Title */}
      <h2
        data-aos="fade-up"
        className="text-4xl font-extrabold text-center mb-12"
      >
        Find Your Perfect Stay 🏨
      </h2>

      {/* Filters */}
      <div
        data-aos="fade-down"
        className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by city"
            className="border dark:border-slate-700 bg-transparent p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            type="number"
            placeholder="Max price (₹)"
            className="border dark:border-slate-700 bg-transparent p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <select
            className="border dark:border-slate-700 bg-transparent p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
          >
            <option value="">All stars</option>
            {[1, 2, 3, 4, 5].map((s) => (
              <option key={s} value={s}>
                {s} Star
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredHotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>

      {/* Empty State */}
      {filteredHotels.length === 0 && (
        <p
          data-aos="fade-up"
          className="text-center text-gray-500 dark:text-gray-400 mt-20"
        >
          No hotels found matching your filters 😔
        </p>
      )}
    </div>
  );
}
