const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const fbCredentialsValidation = async (req, res) => {
  const { facebookId } = req.body;
  try {
    const user = await User.findOne({ facebookId });
    if (user) {
      console.log("user", user);
      const token = jwt.sign(
        { subject: user.facebookId },
        process.env.JWT_SECRET_KEY
      );
      res.status(200).json({ token: token });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const register = async (req, res) => {
  const { facebookId, name, dateOfBirth, imageURL } = req.body;
  try {
    const user = await User.findOne({
      facebookId,
    });
    if (user) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const newUser = new User({
        facebookId,
        name,
        dateOfBirth,
        imageURL,
      });
      const token = jwt.sign(
        { subject: facebookId },
        process.env.JWT_SECRET_KEY
      );
      await newUser.save();
      res.status(201).json({ token: token });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  fbCredentialsValidation,
  register,
};
