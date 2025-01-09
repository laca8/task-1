const { TextDecoder } = require("util");
global.TextDecoder = TextDecoder;
const express = require("express");
const path = require("path");
const db = require("./config/db");
const doctorRoutes = require("./routes/doctorRoute");
const dotenv = require("dotenv");
const cors = require("cors");
const globalError = require("./middleware/errorHandler");
const ApiError = require("./utils/ApiError");
const app = express();
db();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/uploads", express.static("uploads"));
//routes
app.use("/api/doctor", doctorRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running...");
  });
}
app.use("*", (req, res, next) => {
  next(new ApiError("this route not found", 404));
});
app.use(globalError);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running at ${PORT}.....`);
});
