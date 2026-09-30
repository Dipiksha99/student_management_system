const form = document.getElementById("registrationForm");

form.addEventListener("submit", (event) => {

  event.preventDefault();

  const studentId = document.getElementById("id").value;
  const fullname = document.getElementById("name").value;
  const course = document.getElementById("course").value;
  const email = document.getElementById("email").value;
  const phonenumber = document.getElementById("phone").value;
  const gender = document.querySelector(
    'input[name="gender"]:checked'
  ).value;
  const dob = document.getElementById("dob").value;
  const address = document.getElementById("address").value;

  // Get student status
  const status = document.getElementById("status").value;


  const studentData = {
    studentId: studentId,
    fullname: fullname,
    course: course,
    email: email,
    phonenumber: phonenumber,
    gender: gender,
    dob: dob,
    address: address,
    status: status
  };


  fetch("http://localhost:5000/api/students", {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(studentData)
  })
    .then(response => {

      if (!response.ok) {
        throw new Error(
          "Server returned an error: " + response.status
        );
      }

      return response.text();
    })
    .then(data => {

      console.log(data);

      alert(data);

      form.reset();

    })
    .catch(error => {

      console.error("Error:", error);

      alert("Student save nahi hua. Console check karo.");

    });

});


// Back to Dashboard
const homeButton = document.getElementById("homeButton");

homeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});