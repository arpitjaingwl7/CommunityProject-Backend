import mongoose from "mongoose";
let { Schema, model } = mongoose;

// Define the like schema
let likeSchema = new Schema({
    user : {type : Schema.Types.ObjectId , ref : "User" , required: true },
    blog : {type : Schema.Types.ObjectId, ref : "Blog" , required: true }
},{timestamps : true });

// Add a unique compound index on user and blog
likeSchema.index({ user: 1, blog: 1 }, { unique: true });

// Create the Like model
let Like = model('Like' , likeSchema);

export default Like;
