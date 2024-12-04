import express from "express"
import { protectRoute } from "../middlleware/auth.middleware.js"
import { getMessages, getUsersForSlideBar, sendMessage } from "../controllers/message.controller.js"

const router = express.Router()

router.get("/users",protectRoute,getUsersForSlideBar)
router.get("/:id",protectRoute,getMessages)
router.post("/sender/:id",protectRoute,sendMessage)


export default router 