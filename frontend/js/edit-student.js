// Back to Students button
const backButton = document.getElementById("backButton");

backButton.addEventListener("click", () => {
  window.location.href = "students.html";
});

// Edit student form
const form = document.getElementById("editStudentForm");

// Get student ID from URL
const currentUrl = new URL(window.location.href);
const id = currentUrl.searchParams.get("id");

console.log("Full URL:", currentUrl.href);
console.log("Student ID:", id);

// Check ID
if (!id) {
  alert("Student ID is missing.");
  throw new Error("Student ID is missing from URL");
}

// Get existing student data
fetch(`https://student-management-system-u571.onrender.com  /api/students/${id}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Student not found");
    }

    return response.json();
  })
  .then((student) => {
    document.getElementById("id").value = student.studentId || "";

    document.getElementById("name").value =
      student.fullname || student.name || "";

    document.getElementById("course").value = student.course || "";

    document.getElementById("email").value = student.email || "";

    document.getElementById("phone").value =
      student.phonenumber || student.phone || "";

    // Gender
    if (student.gender === "Male") {
      document.getElementById("male").checked = true;
    }

    if (student.gender === "Female") {
      document.getElementById("female").checked = true;
    }

    // Date of Birth
    if (student.dob) {
      document.getElementById("dob").value = new Date(student.dob)
        .toISOString()
        .split("T")[0];
    }

    // Address
    document.getElementById("address").value = student.address || "";

    // Status
    document.getElementById("status").value = student.status || "Active";
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// Update student
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const studentData = {
    studentId: document.getElementById("id").value,

    fullname: document.getElementById("name").value,

    course: document.getElementById("course").value,

    email: document.getElementById("email").value,

    phonenumber: document.getElementById("phone").value,

    gender: document.querySelector('input[name="gender"]:checked')?.value || "",

    dob: document.getElementById("dob").value,

    address: document.getElementById("address").value,

    status: document.getElementById("status").value,
  };

  try {
    const response = await fetch(`https://student-management-system-u571.onrender.com/api/students/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      throw new Error("Student update failed");
    }

    alert("Student updated successfully!");

    window.location.href = "students.html";
  } catch (error) {
    console.log("Error:", error);

    alert("Student update nahi hua.");
  }
});
