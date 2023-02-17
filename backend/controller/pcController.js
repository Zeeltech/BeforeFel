const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Pc = require("../models/pcModel");

const loginPc = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Pc.findOne({ email });

    if (!user) {
      res.json({ message: "User not found" });
    } else if (user.status == "Pending") {
      res.json({ message: "Pending Status" });
    } else if (
      user &&
      (await bcrypt.compare(password, user.password)) &&
      user.status == "Active"
    ) {
      const token = await user.generateAuthToken();
      console.log(`Generated by login pc ${token}`);

      res.cookie("jwtokendean", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
      });

      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: token,
        message: "Successfully logged in",
      });
    } else {
      res.json({ message: "Invalid Password" });
    }
  } catch (error) {
    console.log(error);
  }
};

//==========================================================

const registerPc = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    const userExists = await Pc.findOne({ email });

    if (userExists) {
      res.json({ message: "User Already Exists" });
    }

    // Hash Password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create User

    const user = await Pc.create({
      name,
      email,
      department,
      password: hashedPassword,
      status: "Pending",
    });

    if (user) {
      const token = await user.generateAuthToken();
      console.log(`Generated by signup ${token}`);

      res.cookie("jwtokendean", token, {
        expires: new Date(Date.now() + 86400000),
      });

      await user.save();

      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: token,
        message: "Successfully signed up",
      });
    } else {
      res.status(400);
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllPending = async (req, res) => {
  try {
    const { status } = req.body;

    const pcs = await Pc.find({ status });
    if (!pcs) {
      res.json({ message: "No pending Pc" });
    } else {
      res.json({ message: "Pc Details", pcs: pcs });
    }
  } catch (error) {
    console.log(error);
  }
};

const makeActive = async (req, res) => {
  try {
    const { email } = req.body;

    Pc.findOne({ email }, (err, pc) => {
      if (err) return res.status(500).send(err);

      if (pc.status === "Pending") {
        pc.status = "Active";
      }

      pc.save((err, pcs) => {
        if (err) return res.status(500).send(err);
        res.send(pcs);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { loginPc, registerPc, getAllPending, makeActive };
