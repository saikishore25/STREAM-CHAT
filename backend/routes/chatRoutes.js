import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { getStreamToken } from "../controllers/chatController.js";

const router = express.Router();

router.get("/token", verifyJWT, getStreamToken);

export default router;