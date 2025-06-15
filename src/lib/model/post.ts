import mongoose from "mongoose";
/// photo profil
const postSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    tags: [String],
    likes: Number,
    views: Number,
    category: [String],
    image: String,
  },
  { collection: "post" }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
//// s -> not s
// capital world
export default Post;

//// do creat post , news letter
