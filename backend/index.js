const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/huckzone").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

app.get("/", (req, res) => {
    res.send("Hello World");
    
});

app.listen(2500, () => {
    console.log("Server is running on port 2500");
});