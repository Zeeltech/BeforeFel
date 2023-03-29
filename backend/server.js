const express = require("express");
const dotenv = require("dotenv").config();
const deanroute = require("./routes/deanroute");
const hodroute = require("./routes/hodroute");
const pcroute = require("./routes/pcroute");
const adminroute = require("./routes/adminroute");
const { errorHandler } = require("./middleware/errorMiddleware");
const colors = require("colors");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

connectDB();

const app = express();

const corsOptions = {
  origin: process.env.VERCEL_URL,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use("api/admin", adminroute);
app.use("api/dean", deanroute);
app.use("api/hod", hodroute);
app.use("api/pc", pcroute);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on ${port}`));
