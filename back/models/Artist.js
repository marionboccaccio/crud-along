const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: String,
  style: {
    type: Schema.Types.ObjectId,
    ref: "Style"
  },
  description: String,
  isBand: Boolean,
  rates: [
    {
      rate: Number,
      author: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ]
});

const artistModel = mongoose.model("Artist", artistSchema);

module.exports = artistModel;
