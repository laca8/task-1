const express = require("express");
const {
  addDoctor,
  fetchDoctors,
  removeDoctor,
} = require("../controller/doctorCntrl");
const router = express.Router();
router.post("/", addDoctor);
router.delete("/:id", removeDoctor);
router.get("/", fetchDoctors);
module.exports = router;
