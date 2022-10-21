import Comment from "../Models/Comment.js";
import Agent from "../Models/Agent.js";
import User from "../Models/User.js";

//coment to agent
export const commentToAgent = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    const savedComment = await comment.save();
    res.status(201).json({ success: true, data: savedComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get single agent comment

export const getAgentComments = async (req, res) => {
  try {
    const agentsComment = await Comment.find({
      agent: req.params.id,
    }).populate('user');
    res.status(200).json({ success: true, data: agentsComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//edit own comment

export const editOwnComment = async (req, res) => {
  try {
    const myComment =await Comment.findById(req.params.id);
    if (!myComment)
      return res.status(404).json({ message: "comment not found" });
    const editedComment =await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate('user');
    res.status(200).json({ success: true, data: editedComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete own comment
export const deleteOwnComment = async (req, res) => {
  try {
    const myComment =await Comment.findById(req.params.id);
    if (!myComment)
      return res.status(404).json({ message: "comment not found" });
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
