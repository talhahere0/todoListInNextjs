import dbConnect from "../utils/connection/mongodbConnection";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";
const asyncHandler = require("express-async-handler");

const auth = async (req, res,next) => {
  await dbConnect();

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split('').[1]

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      //Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch(e) {
        console.log(e)
        res.status(401).json({
            message:"Not authorization"
        })
    }
  }

  if(!token){
      res.status(401).json({
          message:"Not authorization, No token"
      })
  }
};
export default auth;
