import User from "../models/userModel.js";

export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: null,
      });
    } else {
      return res.sendApiError({
        title: "Invalid data",
        detail: "Invalid email or password",
      });
    }
  } catch (error) {
    return res.mongoError(error);
  }
};
