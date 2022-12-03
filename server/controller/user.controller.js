const User = require("../model/user.model");

const getSelf = async (req, res) => {
  const { facebookId } = req.body;
  try {
    const user = await User.findOne({ facebookId });
    console.log("user", user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getSelf,
};
