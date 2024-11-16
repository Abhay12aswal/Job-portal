import express from "express";
import {register ,login  ,logout , updateprofile, getAllUser} from "../controllers/user.js"
import isAuthenticated from "../middleware/isAuthenticated.js";
import {singleUpload} from "../middleware/multer.js"

const router = express.Router();

router.route("/register").post(singleUpload ,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/all").get(getAllUser)
router.route("/profile/update").post(isAuthenticated,updateprofile)

export default router;