import mongoose from "mongoose";
let { Schema, model } = mongoose;

let blogSchema = new Schema(
  {
    blogMessage: { type: String , trim: true},
    image: { type: String },
    isAnonymous: { type: Boolean, default: false },
    hashtag: { type: [String] },
    user: { type: Schema.Types.ObjectId, ref: "User" , required: true},
  },
  { timestamps: true }
);

let Blog = model("Blog" , blogSchema);

export default Blog;
