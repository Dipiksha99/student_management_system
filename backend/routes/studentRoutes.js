const express = require("express");
const router = express.Router();

const Student = require("../models/Student.js");

router.post("/", async (req, res) => {
  //add student
  try {
    const studentData = req.body;
    const student = new Student(studentData);
    await student.save();
    res.send("Student registered successfully");
  } catch (error) {
    console.log("Error:", error);
  }
});

router.get("/", async (req, res) => {
  // Get student
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.log("Error", error);
  }
});

router.get("/:id", async (req, res) => {

  try {

    const id = req.params.id;

    if (!id || !Student.db.base.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid student ID");
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).send("Student not found");
    }

    res.json(student);

  } catch (error) {

    console.log("Error:", error);
    res.status(500).send("Server error");

  }

});
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(id);
    res.send("Student deleted successfully");
  } catch (error) {
    console.log("Error", error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send("Student updated successfully");
  } catch (error) {
    console.log("Error:", error);
  }
});

module.exports = router;
