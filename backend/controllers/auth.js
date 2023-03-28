const User = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(404).json({ success: false });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne(req.body);
    if (!user) {
      throw new Error("no user found");
    }
    console.log(user);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(404).json({ success: false });
  }
};

module.exports = { registerUser, loginUser };
