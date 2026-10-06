import { Router } from "express";
const router = Router();
import * as userservice from "./Users.service.js";

router.post("/signup", userservice.usersign);
router.put("/:id", userservice.createOrUpdate);
router.get("/by-email", userservice.findByEmail);
router.get("/:id", userservice.getuser);

export default router;
