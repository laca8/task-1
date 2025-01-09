const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: [true, "First Name Required"],
    },
    sName: {
      type: String,
      required: [true, "Second Name Required"],
    },
    email: {
      type: String,
      required: [true, "Email Required"],
    },
    password: {
      type: String,
      required: [true, "Password Required"],
      minlength: [6, "Password must be at least 6 charcters"],
    },
    phone: {
      type: String,
      required: [true, "Phone Required"],
    },
    image: {
      type: String,
    },
    branches: {
      type: [
        {
          branch: {
            type: String,
            required: [true, "Branch Required"],
          },
          start: {
            type: String,
            required: [true, "Starting Time Required"],
          },
          end: {
            type: String,
            required: [true, "Ending Time Required"],
          },
          days: {
            type: Array,
            required: [true, "days Required"],
          },
        },
      ],
      required: [true, "Branches Required"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("doctors", doctorSchema);
