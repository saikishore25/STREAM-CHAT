import express from "express"
import verifyJWT from "../middlewares/verifyJWT.js";
import { GetRecommendedUsers, GetFriends, SendFriendRequest, AcceptFriendRequest, getFriendRequests, getOutgoingFriendReqs } from "../controllers/userController.js";
const router = express.Router();

router.use(verifyJWT)
router.get("/get-recommended-users", GetRecommendedUsers )
router.get("/get-friends", GetFriends )
router.post("/send-friend-request/:id", SendFriendRequest)
router.put("/accept-friend-request/:id", AcceptFriendRequest)
router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router