 const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb+srv://sudampanda496_db_user:lEgUkKHEi0zJcL4S@cluster0.86h8xws.mongodb.net/studentDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const Student = mongoose.model("Student", studentSchema);

// Route to serve HTML
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Form submit route
app.post("/register", async (req, res) => {
    const newStudent = new Student({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    });

    await newStudent.save();
    res.send("Student Data Saved Successfully!");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
