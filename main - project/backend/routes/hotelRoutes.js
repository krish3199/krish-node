const express = require("express");
const { addHotel, getHotels, getHotelById } = require("../controllers/hotelController");
const { isAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", isAuth, addHotel);   // admin
router.get("/", getHotels);
router.get("/:id", getHotelById);

module.exports = router;
