import API from "./axios";

export const getAdminDashboard = () => API.get("/dashboard/admin");
export const getStoreOwnerDashboard = (storeId) => API.get(`/dashboard/store/${storeId}`);
