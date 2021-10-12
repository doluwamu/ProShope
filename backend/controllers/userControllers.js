import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (error) {
    return res.send({ error });
  }
};
