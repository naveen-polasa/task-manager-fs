const User = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("empty values");
    const user = await User.findOne(req.body);
    if (!user) {
      throw new Error("no user found");
    }
    console.log(user);
    const token = await user.createJWT();
    console.log(token);
    res.status(200).json({ user: { name: user.name }, token });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error.message });
  }
};

module.exports = { registerUser, loginUser };
