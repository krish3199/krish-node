import api from "./api";

// GET MY BOOKINGS
export const getMyBookings = async () => {
  const res = await api.get("/bookings/my");
  return res.data;
};

// CANCEL BOOKING
export const cancelBooking = async (id) => {
  const res = await api.delete(`/bookings/cancel/${id}`);
  return res.data;
};
