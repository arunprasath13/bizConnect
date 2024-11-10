import cloudinary from "../lib/cloudinary.js";
import Post from "../models/post.model.js";

export const getFeedPosts = async (req, res) => {
  try {
    // to grab the author in array
    const posts = await Post.find({ author: { $in: req.user.connections } })
      .populate("author", "name username profilePicture headline")
      .populate("comments.user", "name profilePicture")
      .sort({ createAt: -1 });

    //populate method is useful when u are refering the objects fields names
    //It accepts two params, one is key name and another one ref of object key name
    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in post controller: ", error);
    res.status(500).status({ message: "Server error" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    let newPost;

    if (image) {
      const imgResult = await cloudinary.uploader.upload(image);
      newPost = new Post({
        author: req.user._id,
        content,
        image: imgResult.secure_url,
      });
    } else {
      newPost = new Post({
        author: req.user._id,
        content,
      });
    }
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log("Error in create post controller: ", error);
    res.status(500).status({ message: "Server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Course not found" });
    }
    if(post.author.toString() !== userId.toString()){
        return res.status(403).json({message:"You are not authorized to delete this post"})
    }
    else{
        if(post.image){
            // to get the url last id to delete the image
            await cloudinary.uploader.destroy(post.image.split("/").pop().split(",")[0])
        }
        await Post.findByIdAndDelete(postId);
        res.status(200).json({message:"Post deleted succesfully"})
    }
  } catch (error) {}
};



export const getPostById = async (req,res) => {
    try{
        const postId = req.params.id;
        const post = await Post.findById(postId).populate("author","name username profilePicture").
        populate("comments.user","name profilePicture username headline");
        res.status(200).json(post);
    }catch(error){
        console.log("Error in getPostById controller",error)
         res.status(500).json({message:"Server error "})
    }
}




// More to add,
export const createComment = async (req,res) => {
    const postId = req.params.id;
    const {content} = req.body;
    const post = await Post.findByIdAndUpdate(postId,{
        $push:{comments:{user:req.user._id,content}}
    },{new:true}).populate("author","name email username headline profilePicture")
}
