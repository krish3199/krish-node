import api from "./api";

export const getAllHotels = async () => {
  const res = await api.get("/hotels");
  return res.data;
};

export const getHotelById = async (id) => {
  const res = await api.get(`/hotels/${id}`);
  return res.data;
};
