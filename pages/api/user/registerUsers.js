import dbConnect from "../../../utils/connection/mongodbConnection";
import UserModel from "../../../models/UserModel";
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const handler = asyncHandler(async (req, res) => {
  await dbConnect();

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "please fill all the fields",
    });
  }

  const oldUser = await UserModel.findOne({ email: req.body.email });
  if (oldUser) {
    return res.status(400).json({
      message: "user already exists",
    });
  }
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(200).json({
    status: "successfully created new user",
    newUser,
  });
});
export default handler;
