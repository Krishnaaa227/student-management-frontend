import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportStudentsToExcel = (students) => {

    const data = students.map(student => ({
        "Roll No": student.rollNo,
        "First Name": student.firstName,
        "Last Name": student.lastName,
        "Email": student.email,
        "Phone": student.phone,
        "Course": student.course,
        "Semester": student.semester
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Students"
    );

    const excelBuffer = XLSX.write(
        workbook,
        {
            bookType: "xlsx",
            type: "array"
        }
    );

    const file = new Blob(
        [excelBuffer],
        {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
        }
    );

    saveAs(file, "Students.xlsx");

};