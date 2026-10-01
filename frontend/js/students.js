const tableBody = document.getElementById("studentTableBody");

const searchInput = document.getElementById("searchInput");

const statusFilter = document.getElementById("statusFilter");

const courseFilter = document.getElementById("courseFilter");

const clearFilters = document.getElementById("clearFilters");

const studentCount = document.getElementById("studentCount");

const noStudents = document.getElementById("noStudents");


let allStudents = [];


// ================= FETCH STUDENTS =================

async function loadStudents() {

    try {

        const response = await fetch(
            "https://student-management-system-u571.onrender.com/api/students"
        );

        if (!response.ok) {

            throw new Error("Failed to fetch students");

        }

        allStudents = await response.json();

        createCourseOptions();

        displayStudents(allStudents);

    } catch (error) {

        console.log("Error:", error);

    }

}


// ================= COURSE OPTIONS =================

function createCourseOptions() {

    const courses = new Set();

    allStudents.forEach((student) => {

        if (student.course) {

            courses.add(student.course.trim());

        }

    });


    courseFilter.innerHTML =
        `<option value="All">All Courses</option>`;


    courses.forEach((course) => {

        const option = document.createElement("option");

        option.value = course;

        option.textContent = course;

        courseFilter.appendChild(option);

    });

}


// ================= DISPLAY STUDENTS =================

function displayStudents(students) {

    tableBody.innerHTML = "";


    studentCount.textContent = students.length;


    if (students.length === 0) {

        noStudents.style.display = "block";

        return;

    }


    noStudents.style.display = "none";


    students.forEach((student) => {

        const row = document.createElement("tr");


        // Student ID
        const idCell = document.createElement("td");

        idCell.textContent = student.studentId || "";

        row.appendChild(idCell);


        // Full Name
        const nameCell = document.createElement("td");

        nameCell.textContent =
            student.fullname ||
            student.name ||
            "";

        row.appendChild(nameCell);


        // Course
        const courseCell = document.createElement("td");

        courseCell.textContent =
            student.course || "";

        row.appendChild(courseCell);


        // Email
        const emailCell = document.createElement("td");

        emailCell.textContent =
            student.email || "";

        row.appendChild(emailCell);


        // Phone
        const phoneCell = document.createElement("td");

        phoneCell.textContent =
            student.phonenumber ||
            student.phone ||
            "";

        row.appendChild(phoneCell);


        // Gender
        const genderCell = document.createElement("td");

        genderCell.textContent =
            student.gender || "";

        row.appendChild(genderCell);


        // DOB
        const dobCell = document.createElement("td");

        if (student.dob) {

            dobCell.textContent =
                new Date(student.dob)
                    .toLocaleDateString();

        } else {

            dobCell.textContent = "";

        }

        row.appendChild(dobCell);


        // Status
        const statusCell = document.createElement("td");

        const statusBadge = document.createElement("span");

        const status =
            student.status || "Active";

        statusBadge.textContent = status;

        statusBadge.classList.add("status-badge");


        if (status === "Inactive") {

            statusBadge.classList.add(
                "status-inactive"
            );

        } else {

            statusBadge.classList.add(
                "status-active"
            );

        }


        statusCell.appendChild(statusBadge);

        row.appendChild(statusCell);


        // Address
        const addressCell = document.createElement("td");

        addressCell.textContent =
            student.address || "";

        row.appendChild(addressCell);


        // Actions
        const actionCell =
            document.createElement("td");

        actionCell.classList.add("action-cell");


        // Edit
        const editButton =
            document.createElement("button");

        editButton.textContent = "Edit";

        editButton.classList.add("edit-btn");


        editButton.addEventListener("click", () => {

            window.location.href =
                `edit-student.html?id=${student._id}`;

        });


        // Delete
        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.classList.add("delete-btn");


        deleteButton.addEventListener("click", () => {

            deleteStudent(student._id);

        });


        actionCell.appendChild(editButton);

        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);


        tableBody.appendChild(row);

    });

}


// ================= SEARCH + FILTER =================

function applyFilters() {

    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();

    const selectedStatus =
        statusFilter.value;

    const selectedCourse =
        courseFilter.value;


    const filteredStudents =
        allStudents.filter((student) => {

            const studentId =
                String(student.studentId || "")
                    .toLowerCase();

            const name =
                String(
                    student.fullname ||
                    student.name ||
                    ""
                ).toLowerCase();

            const email =
                String(student.email || "")
                    .toLowerCase();


            const matchesSearch =
                studentId.includes(searchText) ||
                name.includes(searchText) ||
                email.includes(searchText);


            const studentStatus =
                student.status || "Active";


            const matchesStatus =
                selectedStatus === "All" ||
                studentStatus === selectedStatus;


            const matchesCourse =
                selectedCourse === "All" ||
                student.course === selectedCourse;


            return (
                matchesSearch &&
                matchesStatus &&
                matchesCourse
            );

        });


    displayStudents(filteredStudents);

}


// ================= DELETE =================

async function deleteStudent(id) {

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
                method: "DELETE"
            }

        );


        if (!response.ok) {

            throw new Error(
                "Failed to delete student"
            );

        }


        const message =
            await response.text();


        alert(message);


        await loadStudents();


    } catch (error) {

        console.log("Error:", error);

        alert("Student delete nahi hua.");

    }

}


// ================= CLEAR FILTERS =================

clearFilters.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        statusFilter.value = "All";

        courseFilter.value = "All";

        displayStudents(allStudents);

    }
);


// ================= EVENTS =================

searchInput.addEventListener(
    "input",
    applyFilters
);


statusFilter.addEventListener(
    "change",
    applyFilters
);


courseFilter.addEventListener(
    "change",
    applyFilters
);


// Start
loadStudents();