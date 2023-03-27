const User = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(404).json({ error });
}
};

const loginUser = async (req, res) => {
    try {
        
        res.status(200).json(req.body);
    } catch (error) {
      res.status(404).json({ error });
  }
};

module.exports = { registerUser, loginUser };
