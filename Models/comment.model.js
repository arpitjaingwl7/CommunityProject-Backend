import mongoose from "mongoose";

let { Schema, model } = mongoose;


let commentSchema = new Schema({
    commentMessage : {type : String , required : true },
    blog : {type : Schema.Types.ObjectId, ref: "Blog" , required : true},
    user : {type : Schema.Types.ObjectId, ref:"User" , required : true }
} , {timestamps: true});

// Adding indexes to improve query performance
commentSchema.index({ blog: 1 });
commentSchema.index({ user: 1 });


let Comment = model("Comment", commentSchema);

export default Comment; 