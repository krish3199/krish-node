import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminAddHotel() {
  const navigate = useNavigate();

  const [hotel, setHotel] = useState({
    name: "",
    city: "",
    stars: "",
    description: "",
  });

  const [rooms, setRooms] = useState([
    { type: "", price: "", availableRooms: "" },
  ]);

  const [loading, setLoading] = useState(false);

  // HANDLE HOTEL INPUT
  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  // HANDLE ROOM INPUT
  const handleRoomChange = (index, e) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][e.target.name] = e.target.value;
    setRooms(updatedRooms);
  };

  // ADD NEW ROOM
  const addRoom = () => {
    setRooms([...rooms, { type: "", price: "", availableRooms: "" }]);
  };

  // REMOVE ROOM
  const removeRoom = (index) => {
    const updatedRooms = rooms.filter((_, i) => i !== index);
    setRooms(updatedRooms);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hotel.name || !hotel.city || !hotel.stars) {
      alert("Please fill hotel details");
      return;
    }

    try {
      setLoading(true);

      await api.post("/hotels/add", {
        ...hotel,
        stars: Number(hotel.stars),
        rooms: rooms.map((r) => ({
          type: r.type,
          price: Number(r.price),
          availableRooms: Number(r.availableRooms),
        })),
      });

      alert("Hotel added successfully 🎉");
      navigate("/admin/hotels");
    } catch (err) {
      console.error(err);
      alert("Failed to add hotel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Hotel</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* HOTEL DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Hotel Name"
            className="border p-3 rounded"
            value={hotel.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            className="border p-3 rounded"
            value={hotel.city}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="stars"
            placeholder="Stars (1–5)"
            min="1"
            max="5"
            className="border p-3 rounded"
            value={hotel.stars}
            onChange={handleChange}
            required
          />
        </div>

        <textarea
          name="description"
          placeholder="Hotel description"
          className="border p-3 rounded w-full"
          value={hotel.description}
          onChange={handleChange}
        />

        {/* ROOMS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Rooms</h2>

          {rooms.map((room, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3"
            >
              <input
                type="text"
                name="type"
                placeholder="Room Type"
                className="border p-2 rounded"
                value={room.type}
                onChange={(e) => handleRoomChange(index, e)}
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                className="border p-2 rounded"
                value={room.price}
                onChange={(e) => handleRoomChange(index, e)}
                required
              />

              <input
                type="number"
                name="availableRooms"
                placeholder="Available"
                className="border p-2 rounded"
                value={room.availableRooms}
                onChange={(e) => handleRoomChange(index, e)}
                required
              />

              {rooms.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRoom(index)}
                  className="bg-red-500 text-white rounded px-3"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addRoom}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Room
          </button>
        </div>

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {loading ? "Adding..." : "Add Hotel"}
        </button>
      </form>
    </div>
  );
}
