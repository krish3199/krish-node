import { Link } from "react-router-dom";
import Hotels from "./Hotels";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="text-center py-20 bg-white">
        <h1 className="text-5xl font-bold mb-4">
          Find Your Perfect Hotel 🏨
        </h1>
        <p className="text-gray-600 text-lg">
          Search, compare and book hotels easily
        </p>

        <Link
          to="/hotels"
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Explore Hotels
        </Link>
      </section>

      {/* HOTELS LIST */}
      <section className="px-10">
        <Hotels />
      </section>
    </div>
  );
}
