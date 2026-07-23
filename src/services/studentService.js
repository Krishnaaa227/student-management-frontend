import api from "../api/axiosConfig";

export const getAllStudents = () => {

    return api.get("/students", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

};

export const addStudent = (student) => {

    return api.post("/students", student, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
};
export const getStudentById = (id) => {
    return api.get(`/students/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
};
export const updateStudent = (id, student) => {
    return api.put(`/students/${id}`, student, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
};
export const deleteStudent = (id) => {
    return api.delete(`/students/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
};