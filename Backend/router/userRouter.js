import express from "express"
import userRegister from "../controller/userController.js"
import login from "../controller/userController.js"

const router = express.Router()

router.post("/register", userRegister)
router.post("/login", login)

export default router