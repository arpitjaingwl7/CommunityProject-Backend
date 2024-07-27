import mongoose from "mongoose";

let { Schema, model } = mongoose;

let followSchema = new Schema(
  {
    followedBy: { type: Schema.Types.ObjectId, ref: "User", require: true },
    followedTo: { type: Schema.Types.ObjectId, ref: "User", require: true },
  },
  { timestamps: true }
);

followSchema.index({ followedBy: 1, followedTo: 1 }, { unique: true });

let Follow = model("Follow", followSchema);

export default Follow;
