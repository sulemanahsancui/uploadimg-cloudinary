const User = require("../model/user");
const path = require("path");
const cloudinary = require("cloudinary").v2;

const fs = require("fs");

//get all users
exports.getUsers = async (req, res) => {
  const user = await User.find();
  if (!user) return res.status(404).json({ message: "No user exist in db " });
  res.status(200).json({ user: user });
};

//get single user
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res
      .status(400)
      .json({ message: "There is no user exist with this id" });
  res.status(200).json({ user: user });
};

// create user

exports.createUser = async (req, res) => {
  const add_user = new User(req.body);
  await add_user.save();
  res.send({ message: "User added", user: add_user });
};

//delete user

exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user)
    return res
      .status(400)
      .json({ message: "There is no user exist with this id" });
  res.status(200).json({ message: "deleted successfully" });
};

// upload image
exports.userProfileUploadImage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(400)
        .json({ message: "There is no user exist with this id" });
    console.log(req.files);
    const profile = req.files.profile;
    const fileName = `${req.params.id}${path.extname(profile.name)}`;
    // image validation todo

    //cloudinary

    cloudinary.uploader.upload(
      profile.tempFilePath,
      {
        // use_filename: true,
        // unique_filename: false,
        folder: "students",
        public_id: req.params.id,
      },
      async (err, image) => {
        if (err) {
          console.log(err);
        }
        console.log("File Uploaded");
        await User.findByIdAndUpdate(req.params.id, { profile: image.url });
        fs.unlink(profile.tempFilePath, (err) => {
          if (err) console.log(err);
        });
        res.status(200).json({
          data: {
            file: image.url,
          },
        });
      }
    );

    // profile.mv(`uploads/${fileName}`, async (err) => {
    //   if (err) {
    //     console.log(err);
    //     return res.status(500).send(err);
    //   }
    //   //update student profile
    //   await User.findByIdAndUpdate(req.params.id, { profile: fileName });
    //   res.status(200).json({
    //     data: {
    //       file: `${req.protocol}://${req.get("host")}/${fileName}`,
    //     },
    //   });
    // });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
