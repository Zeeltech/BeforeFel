const express = require("express");
const dotenv = require("dotenv").config();
const deanroute = require("./routes/deanroute");
const hodroute = require("./routes/hodroute");
const pcroute = require("./routes/pcroute");
const adminroute = require("./routes/adminroute");
const colors = require("colors");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/admin", adminroute);
app.use("/dean", deanroute);
app.use("/hod", hodroute);
app.use("/pc", pcroute);

app.listen(port, () => console.log(`Server started on ${port}`));
