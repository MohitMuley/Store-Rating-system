import API from "./axios";

export const getAllUsers = () => API.get("/users");
export const getUserById = (id) => API.get(`/users/${id}`);
export const createUser = (data) => API.post("/users", data);
export const updatePassword = (data) => API.put("/users/update-password", data);
