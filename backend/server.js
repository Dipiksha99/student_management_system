const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

mongoose.connect( process.env.MONGODB_URI)
.then(() =>{
    console.log("Connected to MongoDB");
})
.catch((error) =>{
    console.log("Error connecting to MongoDB:", error);
});

const exp = require("express");

const studentRoutes = require("./routes/studentRoutes.js");

const app = exp();

app.use(cors());

app.use(exp.json());
app.use("/api/students", studentRoutes);

// app.post("/api/students",(req,res) =>{
//     const student = req.body;
//     console.log("Student Data Received:", student);
//     res.send("Student data received successfully");
// })

app.use(cors());

app.use(exp.json());

app.use("/api/students", studentRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});