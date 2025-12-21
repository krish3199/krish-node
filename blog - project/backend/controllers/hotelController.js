const Hotel = require("../models/Hotel");

// ADD HOTEL (ADMIN)
exports.addHotel = async (req, res) => {
  const hotel = await Hotel.create(req.body);
  res.json({ success: true, hotel });
};

// GET ALL HOTELS
exports.getHotels = async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
};

// GET SINGLE HOTEL
exports.getHotelById = async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  res.json(hotel);
};
