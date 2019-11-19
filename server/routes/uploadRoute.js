const express = require("express");
const router = express.Router();
const uploader = require("../configs/cloudinary-setup");
const User = require("../models/User");

router.post(
  "/profile-photo",
  uploader.single("profile-photo"),
  async (req, res, next) => {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    try {
      const { _id } = req.session.user;
      const user = await User.findByIdAndUpdate(
        _id,
        {
          $set: {
            "profilePhoto.imageUrl": req.file.secure_url,
            "profilePhoto.caption": req.body.caption
          }
        },
        {
          new: true
        }
      );

      req.session.user = user;
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

module.exports = router;
