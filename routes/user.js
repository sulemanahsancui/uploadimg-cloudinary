const express = require("express");
const router = express.Router();

const {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  userProfileUploadImage,
} = require("../controller/user");

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).delete(deleteUser);
router.route("/profile/:id").post(userProfileUploadImage);
module.exports = router;
