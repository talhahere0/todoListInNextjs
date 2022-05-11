import dbConnect from "../../../utils/connection/mongodbConnection";
import UserModel from "../../../models/UserModel";
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const handler = asyncHandler(async (req, res) => {
  await dbConnect();

  const { username, email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res
      .status(200)
      .json({ _id: user.id, username: user.username, email: user.email });
  } else {
    res.status(400).json({
      message: "invalid credentials",
    });
  }
});
export default handler;
