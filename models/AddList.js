const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const AddListSchema = new Schema(
  {
    task: {
      type: String,
    },
  },

  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.models.List || mongoose.model("List", AddListSchema);
