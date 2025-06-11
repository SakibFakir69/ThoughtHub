import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  likes: Number,
  views: Number,
}, { collection: 'post' });

const Post =mongoose.models.Post ||  mongoose.model("Post", postSchema);
//// s -> not s 
// capital world
export default Post;




