const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    studentId: String,

    fullname: String,

    course: String,

    email: String,

    phonenumber: String,

    gender: String,

    dob: Date,

    address: String,

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;