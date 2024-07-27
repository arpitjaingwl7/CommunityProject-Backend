import mongoose from "mongoose";

let { Schema, model } = mongoose;

let saveblogSchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : "User" , unique : true},
    blog : {type : Schema.Types.ObjectId, ref : "Blog" , unique: true},
} , {timestamps : true }) 

// Unique compound index to ensure that a user can only save the same blog once
saveblogSchema.index({ user: 1, blog: 1 }, { unique: true });

let Saveblog = model("Saveblog" , saveblogSchema);

export default Saveblog;