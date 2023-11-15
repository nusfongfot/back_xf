const express = require("express");
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 3056;
const host = "0.0.0.0";
require("dotenv").config();


const productRoute = require("./routes/productRoute");

// Allow,Parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//uploads
app.use(fileUpload({ useTempFiles: true }));
//ให้หน้าบ้านเข้าถึงไฟล์นี้
app.use("/uploads", express.static("uploads"));

app.use("/api/v1", productRoute);


app.listen(PORT, host, () => {
  console.log(`Listening on ${PORT}`);
});
