const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");

// =======================
// CREATE BOOKING
// =======================
exports.createBooking = async (req, res) => {
  try {
    const { hotelId, roomType, checkIn, checkOut } = req.body;

    // 1️⃣ Validation
    if (!hotelId || !roomType || !checkIn || !checkOut) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 2️⃣ Find hotel
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // 3️⃣ Check rooms
    if (!hotel.rooms || hotel.rooms.length === 0) {
      return res.status(400).json({ message: "No rooms in this hotel" });
    }

    // 4️⃣ Find room
    const room = hotel.rooms.find(r => r.type === roomType);
    if (!room || room.availableRooms <= 0) {
      return res.status(400).json({ message: "Room not available" });
    }

    // 5️⃣ Date calculation
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const days = Math.ceil(
      (end - start) / (1000 * 60 * 60 * 24)
    );

    if (isNaN(days) || days <= 0) {
      return res.status(400).json({ message: "Invalid booking dates" });
    }

    // 6️⃣ Price calculation
    const totalPrice = days * room.price;

    // 7️⃣ Update room count
    room.availableRooms -= 1;
    await hotel.save();

    // 8️⃣ Create booking
    const booking = await Booking.create({
      userId: req.userId,
      hotelId,
      roomType,
      checkIn: start,
      checkOut: end,
      days,
      totalPrice,
      status: "Booked"
    });

    res.status(201).json({ success: true, booking });

  } catch (error) {
    console.error("BOOKING ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// MY BOOKINGS
// =======================
exports.myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId })
      .populate("hotelId");

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// CANCEL BOOKING
// =======================
exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    // 1️⃣ Find booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 2️⃣ Only booking owner can cancel
    if (booking.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // 3️⃣ Already cancelled
    if (booking.status === "Cancelled") {
      return res.status(400).json({ message: "Booking already cancelled" });
    }

    // 4️⃣ Find hotel
    const hotel = await Hotel.findById(booking.hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // 5️⃣ Increase room availability
    const room = hotel.rooms.find(r => r.type === booking.roomType);
    if (room) {
      room.availableRooms += 1;
      await hotel.save();
    }

    // 6️⃣ Update booking status
    booking.status = "Cancelled";
    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled successfully"
    });

  } catch (error) {
    console.error("CANCEL BOOKING ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("hotelId", "name city");

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
