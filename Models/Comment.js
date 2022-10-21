import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "Users" ,required:true},
    agent: { type: mongoose.SchemaTypes.ObjectId, ref: "Agent" ,required:true},
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const CommentProperties = mongoose.model("Comments", commentSchema);

export default CommentProperties;
