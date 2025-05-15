import express from "express"
import { UserSignup, UserLogin, UserLogout, ProfileSetup } from "../controllers/authController.js"
import verifyJWT from "../middlewares/verifyJWT.js"
const router = express.Router()

router.post("/signup", UserSignup)
router.post("/login", UserLogin)
router.post("/logout", UserLogout)
router.post("/profile-setup",verifyJWT, ProfileSetup)

router.get("/me", verifyJWT, (req, res) => {

    return res.status(200).json({ success: true, user: req.user });
});
export default router