// Back to Dashboard button
const homeButton = document.getElementById("homeButton");

homeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});


const tableBody = document.getElementById("studentTableBody");

fetch("http://localhost:5000/api/students")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch students");
    }

    return response.json();
  })
  .then((data) => {
    data.forEach((student) => {
      const row = document.createElement("tr");

      // Student ID
      const idCell = document.createElement("td");
      idCell.textContent = student.studentId;
      row.appendChild(idCell);

      // Full Name
      const fullnameCell = document.createElement("td");
      fullnameCell.textContent =
        student.fullname || student.name || "";
      row.appendChild(fullnameCell);

      // Course
      const courseCell = document.createElement("td");
      courseCell.textContent = student.course;
      row.appendChild(courseCell);

      // Email
      const emailCell = document.createElement("td");
      emailCell.textContent = student.email;
      row.appendChild(emailCell);

      // Phone
      const phonenumberCell = document.createElement("td");
      phonenumberCell.textContent =
        student.phonenumber || student.phone || "";
      row.appendChild(phonenumberCell);

      // Gender
      const genderCell = document.createElement("td");
      genderCell.textContent = student.gender;
      row.appendChild(genderCell);

      // DOB
      const dobCell = document.createElement("td");

      if (student.dob) {
        dobCell.textContent =
          new Date(student.dob).toLocaleDateString();
      } else {
        dobCell.textContent = "";
      }

      row.appendChild(dobCell);

      // Address
      const addressCell = document.createElement("td");
      addressCell.textContent = student.address;
      row.appendChild(addressCell);

      // Action column
      const actionCell = document.createElement("td");

      // Edit button
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";

      editButton.addEventListener("click", () => {
        window.location.href =
          `edit-student.html?id=${student._id}`;
      });

      actionCell.appendChild(editButton);

      // Delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";

      deleteButton.addEventListener("click", () => {
        deleteStudent(student._id, row);
      });

      actionCell.appendChild(deleteButton);

      // Add Action cell to row
      row.appendChild(actionCell);

      // Add complete row to table
      tableBody.appendChild(row);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });


// Delete student function
async function deleteStudent(id, row) {

  const confirmDelete = confirm(
    "Are you sure you want to delete this student?"
  );

  if (!confirmDelete) {
    return;
  }

  try {

    const response = await fetch(
      `http://localhost:5000/api/students/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete student");
    }

    const message = await response.text();

    alert(message);

    // Remove row from table
    row.remove();

  } catch (error) {

    console.log("Error:", error);
    alert("Student delete nahi hua.");

  }
}