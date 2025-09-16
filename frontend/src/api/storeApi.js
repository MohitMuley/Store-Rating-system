import API from "./axios";

export const getAllStores = () => API.get("/stores");
export const getStoreById = (id) => API.get(`/stores/${id}`);
export const createStore = (data) => API.post("/stores", data);
export const getStoreDashboard = (id) => API.get(`/dashboard/store/${id}`);
