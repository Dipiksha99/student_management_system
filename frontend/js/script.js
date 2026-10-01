const addButton = document.getElementById("add");
const viewButton = document.getElementById("view");

// Dashboard card elements
const totalStudentCard = document.getElementById("sc");
const totalCourseCard = document.getElementById("cc");
const activeStudentCard = document.getElementById("ac");

// Add Student button
addButton.addEventListener("click", () => {
  window.location.href = "registration.html";
});

// View Students button
viewButton.addEventListener("click", () => {
  window.location.href = "students.html";
});

// Load dashboard data
async function loadDashboardData() {
  try {
    const response = await fetch(
      "https://student-management-system-u571.onrender.com/api/students"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch students");
    }

    const students = await response.json();

    console.log("Students from database:", students);

    // Total Students
    const totalStudents = students.length;

    // Total unique courses
    const courses = new Set();

    students.forEach((student) => {
      if (student.course) {
        courses.add(student.course.trim().toLowerCase());
      }
    });

    const totalCourses = courses.size;

    // Active Students
    const activeStudents = students.filter((student) => {
      return student.status !== "Inactive";
    }).length;

    // Update dashboard cards
    totalStudentCard.textContent = totalStudents;

    totalCourseCard.textContent = String(totalCourses).padStart(2, "0");

    activeStudentCard.textContent = activeStudents;

    // Check values in Console
    console.log("Total Students:", totalStudents);
    console.log("Total Courses:", totalCourses);
    console.log("Active Students:", activeStudents);
  } catch (error) {
    console.log("Dashboard Error:", error);
  }
}

// Load dashboard data
loadDashboardData();
