import dbConnect from "../../../utils/connection/mongodbConnection";
import UserModel from "../../../models/UserModel";
import jwt from "jsonwebtoken";
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
import cookie from "cookie";

const handler = asyncHandler(async (req, res) => {
  await dbConnect();

  const { email, password } = req.body;

  // Generate the jwt
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN_DAYS + "d",
    });
  };

  const user = await UserModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", generateToken(user._id), {
        httpOnly: true,
        maxAge: 60 * 24,
        path: "/",
      })
    );
    res.status(200).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      user,
    });
  } else {
    res.status(400).json({
      message: "invalid credentials",
    });
  }
});
export default handler;
