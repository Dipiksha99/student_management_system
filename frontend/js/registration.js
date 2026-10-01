const form = document.getElementById("registrationForm");

const saveButton = form.querySelector(".save-btn");

// ================= SAVE STUDENT =================

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const studentId = document.getElementById("id").value.trim();

  const fullname = document.getElementById("name").value.trim();

  const course = document.getElementById("course").value.trim();

  const email = document.getElementById("email").value.trim();

  const phonenumber = document.getElementById("phone").value.trim();

  const gender =
    document.querySelector('input[name="gender"]:checked')?.value || "";

  const dob = document.getElementById("dob").value;

  const address = document.getElementById("address").value.trim();

  const status = document.getElementById("status").value;

  // ================= PHONE VALIDATION =================

  if (!/^[0-9]{10}$/.test(phonenumber)) {
    alert("Please enter a valid 10-digit phone number.");

    return;
  }

  // ================= STUDENT DATA =================

  const studentData = {
    studentId: studentId,

    fullname: fullname,

    course: course,

    email: email,

    phonenumber: phonenumber,

    gender: gender,

    dob: dob,

    address: address,

    status: status,
  };

  try {
    // Disable button while saving
    saveButton.disabled = true;

    saveButton.textContent = "Saving...";

    // ================= CHECK DUPLICATE STUDENT ID =================

    const checkResponse = await fetch(
      "https://student-management-system-u571.onrender.com/api/students",
    );

    if (!checkResponse.ok) {
      throw new Error("Could not check existing students");
    }

    const students = await checkResponse.json();

    const duplicateStudent = students.some((student) => {
      return (
        String(student.studentId || "")
          .trim()
          .toLowerCase() === studentId.toLowerCase()
      );
    });

    // ================= DUPLICATE ID =================

    if (duplicateStudent) {
      alert("Student ID already exists.\n" + "Please enter a different ID.");

      // Enable button again
      saveButton.disabled = false;

      saveButton.textContent = "Save Student";

      return;
    }

    // ================= SAVE NEW STUDENT =================

    const response = await fetch(
      "https://student-management-system-u571.onrender.com/api/students",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(studentData),
      },
    );

    if (!response.ok) {
      throw new Error("Server returned an error: " + response.status);
    }

    // ================= SUCCESS =================

    alert("Student added successfully!");

    // Go to Students page
    window.location.href = "students.html";
  } catch (error) {
    console.log("Error:", error);

    saveButton.disabled = false;

    saveButton.textContent = "Save Student";

    alert("Student save nahi hua. " + "Backend server check karo.");
  }
});

// ================= CANCEL BUTTON =================

const homeButton = document.getElementById("homeButton");

homeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
