const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  type: String,           // Single, Double, Deluxe
  price: Number,          // price per night
  availableRooms: Number
});

const hotelSchema = new mongoose.Schema({
  name: String,
  city: String,
  description: String,
  amenities: [String],
  rooms: [roomSchema]
}, { timestamps: true });

module.exports = mongoose.model("Hotel", hotelSchema);
