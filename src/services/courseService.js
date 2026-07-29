import api from "../api/axiosConfig";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getCourses = () => {
    return api.get("/courses", authHeader());
};

export const addCourse = (course) => {
    return api.post("/courses", course, authHeader());
};

export const updateCourse = (id, course) => {
    return api.put(`/courses/${id}`, course, authHeader());
};

export const deleteCourse = (id) => {
    return api.delete(`/courses/${id}`, authHeader());
};