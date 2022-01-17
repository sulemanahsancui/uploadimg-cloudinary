const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const users = require("./routes/user");
const cloudinary = require("cloudinary").v2;
const path = require("path");
//intialize express server instamce
const app = express();

//middlewares
// cloudinary.config({
//   cloud_name: "Enter your cloud name",
//   api_key: "ENter your API key",
//   api_secret: "Enter your API secret",
//   secure: true,
// });
app.use(express.json());
app.use(
  fileUpload({
    debug: true,
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "./tmp"),
  })
);
app.use(express.static("uploads"));
app.use("/api/v1/users", users);
// connect to the mongodb

mongoose.connect("mongodb://localhost/user_img", (err, db) => {
  if (err) {
    console.error(err);
  } else {
    console.log("connection build successfully");
  }
});

//listen on port

app.listen(4000, () => {
  console.log("server running at port 4000");
});
