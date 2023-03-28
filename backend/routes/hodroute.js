const express = require("express");
const router = express.Router();
const Hod = require("../models/hodModel");
const { protectHod } = require("../middleware/authHod");

const {
  loginHod,
  registerHod,
  getAllPending,
  makeActive,
  logoutHod,
  getHodInfo,
  deleteHod,
  getdept,
  getrepair,
  getpurchase,
  downloadfile,
  downloadrepairfile,
  searchPurchase,
  searchRepair,
  getSupplier,
} = require("../controller/hodController");

router.post("/signup", registerHod);
router.post("/login", loginHod);
router.post("/req", getAllPending);
router.post("/status", makeActive);
router.get("/dashboard", protectHod, (req, res) => {
  res.json({ message: "Authorized" });
});
router.get("/logout", protectHod, logoutHod);
router.get("/getme", protectHod, getHodInfo);
router.post("/delete", protectHod, deleteHod);
router.get("/getdept", protectHod, getdept);

router.get("/getpurchase", protectHod, getpurchase);
router.get("/getrepair", protectHod, getrepair);

router.get("/downloadfile", protectHod, downloadfile);
router.get("/downloadrepairfile", downloadrepairfile);

router.get("/searchpurchase", protectHod, searchPurchase);
router.get("/searchrepair", protectHod, searchRepair);

router.get("/getsupp", protectHod, getSupplier);

module.exports = router;
