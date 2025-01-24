import { Router } from "express";
import { isAuthenticate } from "../middlewares/auth.middleware";
import { UserController } from "../controllers/user.controller";
const router = Router()


    
router.get('/profile', isAuthenticate , UserController.profile)
router.get('/', isAuthenticate , UserController.profile)

export default router