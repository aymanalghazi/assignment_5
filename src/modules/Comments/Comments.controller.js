import { Router } from "express";
import * as commentService from "./Comments.service.js"
const router = Router()

router.post("/bulkcomments",commentService.createBulk  )


export default router 