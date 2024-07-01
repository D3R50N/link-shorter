const User = require("../../models/userModel");
const errors = require("../../core/errors");


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message, code:errors.code.SERVER_ERROR.code });
  }
};

exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      errors.json(res, errors.code.USER_NOT_FOUND);
    }
};

exports.getUserAttribute = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user[req.params.attr])
      errors.json(res, errors.code.USER_ATTR_NOT_FOUND);
    else res.status(200).json(user[req.params.attr]);
  } catch (err) {
    errors.json(res, errors.code.USER_NOT_FOUND);
  }
};


exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    errors.json(res, errors.code.USER_NOT_CREATED);
  }
};

