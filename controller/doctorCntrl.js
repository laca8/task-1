const Doctor = require("../models/Doctor");
// const multer = require("multer");
// const path = require("path");
const ApiError = require("../utils/ApiError");
// Configure multer for file storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Files will be stored in 'uploads' directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//   },
// });

// // File filter function
// const fileFilter = (req, file, cb) => {
//   // Accept only specific file types
//   const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type"), false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 1 * 1024 * 1024, // 1MB file size limit
//   },
// });
//add doctor
const addDoctor = async (req, res, next) => {
  // console.log(req.body);

  const { fName, sName, email, password, phone, branches, image } = req.body;
  try {
    const newDoctor = await Doctor.create({
      fName,
      sName,
      email,
      phone,
      password,
      branches,
      image,
    });
    return res.status(201).json({ message: "Doctor Added successd..." });
  } catch (error) {
    // console.log(error);
    return next(new ApiError(`Error: ${error.message}`, 500));
  }
};
//fetch doctor
const fetchDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({}).select(
      "fName sName _id image branches"
    );
    return res.status(200).json({ data: doctors });
  } catch (error) {
    console.log(error);
    return next(new ApiError("server error", 500));
  }
};

//fetch doctor
const removeDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json("Doctor deleted...");
  } catch (error) {
    console.log(error);
    return next(new ApiError("server error", 500));
  }
};
module.exports = {
  addDoctor,
  fetchDoctors,
  removeDoctor,
};
