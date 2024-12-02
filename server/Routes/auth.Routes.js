import express from 'express'
import { Login,Signup,Logout ,test} from '../Controllers/auth.Controller.js';
import { protectRoute } from '../middlewares/protectRoute.js';
const router = express.Router();

//test route

router.get("/test",protectRoute,test)
router.post("/login",Login);
router.post("/signup",Signup);
router.post("/logout",Logout);


export default router