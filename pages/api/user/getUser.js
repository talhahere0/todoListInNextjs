import dbConnect from "../../../utils/connection/mongodbConnection";
import UserModel from "../../../models/UserModel";
const asyncHandler = require("express-async-handler");

const handler = asyncHandler(async (req, res) => {
  await dbConnect();

  const getUser = await UserModel.find({});

  res.status(200).json({
    message: "get all user details",
    getUser,
  });
});
export default handler;
