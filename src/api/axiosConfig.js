import axios from "axios";

const api = axios.create({
    baseURL: "https://student-management-backend-ux7r.onrender.com",
});

export default api;