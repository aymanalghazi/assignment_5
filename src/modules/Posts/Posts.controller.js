import { Router } from "express";
const router = Router()
import * as postservice from "./Posts.services.js"

router.post("/create", postservice.createPosts)
router.delete("/:id", postservice.deletePosts)
router.get("/getposts", postservice.getPostsDetails)



export default router