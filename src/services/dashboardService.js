import api from "../api/axiosConfig";

export const getDashboardStats = () => {
    return api.get("/dashboard/stats", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
};

export const getCourseChart = () => {
    return api.get("/dashboard/course-chart", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
};