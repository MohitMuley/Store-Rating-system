import API from "./axios";

export const submitRating = (data) => API.post("/ratings", data);
export const getRatingsByStore = (storeId) => API.get(`/ratings/${storeId}`);
