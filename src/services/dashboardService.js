import api from "../api/axiosConfig";

export const getDashboardStats = () => {
    return api.get("/dashboard/stats");
};
export const getCourseChart = () => {
    return api.get("/dashboard/course-chart");
};