import commentsModel from "../../DB/models/Comments.model.js"

export const createBulk =async (req,res) => {
    try {
        
      const {comments} = req.body

      const createBulkcomment = await commentsModel.bulkCreate(comments)
        res.status(201).json({message:"comments created"})
    

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}