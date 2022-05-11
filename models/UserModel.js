const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const UserModelSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports =
  mongoose.models.Users || mongoose.model("Users", UserModelSchema);
