import express, {Router} from 'express'
import * as userController from "../controllers/userController"

const router: Router = express.Router()

router.post("/", userController.createUserHandler)
router.get("/", userController.getAllUsersHandler)
router.get("/:id", userController.getUserByIdHandler)
router.put("/:id", userController.updateUserHandler)
router.delete("/:id", userController.deleteUserHandler)

export default router;