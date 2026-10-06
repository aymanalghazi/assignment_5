import commentsModel from "../../DB/models/Comments.model.js";
import { userModel } from "../../DB/models/Users.model.js";
import { posts } from "../../DB/models/posts.model.js";
export const createPosts = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const user = await userModel.findByPk(userId);
    if (!user) return res.status(404).json({ message: "user is not found" });
    const newPost = await posts.create({
      title,
      content,
      userId,
    });
    return res
      .status(201)
      .json({ message: "post created successfully", newPost });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};

export const deletePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const user = await userModel.findByPk(userId);
    if (!user) return res.status(404).json({ message: "not user found" });

    const post = await posts.findByPk(id);
    if (!post) return res.status(404).json({ message: "not post found" });
    if (post.userId !== userId)
      return res
        .status(403)
        .json({ message: "you are not authorized to delete this post" });
    const deletedPost = await posts.destroy({ where: { id } });
    return res.status(200).json({ message: "post deleted.", deletedPost });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};

export const getPostsDetails = async (req, res) => {
  try {
    const allPosts = await posts.findAll({
      attributes: ["id", "title"],
      include: [
        {
          model: userModel,
          attributes: ["id", "name"],
        },
        {
          model: commentsModel,
          attributes: ["id", "content"],
        },
      ],
    });
    return res.status(200).json({ message: "Success", posts: allPosts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// number 4 xxxxxxxx