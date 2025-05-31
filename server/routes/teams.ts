import express, {Router} from 'express';
import * as teamController from '../controllers/teamController';

const router: Router = express.Router();

router.post("/", teamController.createTeamHandler);
router.get("/", teamController.getAllTeamsHandler)
router.get("/:id", teamController.getTeamByIdHandler)
router.put("/:id", teamController.updateTeamHandler)
router.delete("/:id", teamController.deleteTeamHandler)
router.put('/:teamId/members/add/:userId', teamController.addMemberHandler);
router.put('/:teamId/members/remove/:userId', teamController.removeMemberHandler);

export default router;