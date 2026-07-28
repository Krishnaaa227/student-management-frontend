import api from "../api/axiosConfig";

export const getCourses = () => {
    return api.get("/courses");
};

export const addCourse = (course) => {
    return api.post("/courses", course);
};

export const updateCourse = (id, course) => {
    return api.put(`/courses/${id}`, course);
};

export const deleteCourse = (id) => {
    return api.delete(`/courses/${id}`);
};