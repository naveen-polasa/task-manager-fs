const User = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = await user.createJWT();
    res.status(201).json({ user: { name: user.name }, token });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("empty values");
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      throw new Error("No User Found");
    }

    const isCorrect = await user.checkPasswords(password);
    if (!isCorrect) {
      throw new Error("Invalid Credentials");
    }
    const token = await user.createJWT();
    res.status(200).json({ user: { name: user.name }, token });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error.message });
  }
};

module.exports = { registerUser, loginUser };
