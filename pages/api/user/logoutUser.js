import dbConnect from "../../../utils/connection/mongodbConnection";
const asyncHandler = require("express-async-handler");
import cookie from "cookie";

const handler = asyncHandler(async (req, res) => {
  await dbConnect();
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    })
  );
  res.status(200).json({
    message: "User successfully logout!",
  });
});
export default handler;
