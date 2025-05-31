import express, { Router } from 'express';
import * as projectController from '../controllers/projectController';

const router: Router = express.Router();

router.post('/', projectController.createProjectHandler);
router.get('/', projectController.getAllProjectsHandler);
router.get('/:id', projectController.getProjectByIdHandler);
router.put('/:id', projectController.updateProjectHandler);
router.delete('/:id', projectController.deleteProjectHandler);
router.put('/:projectId/members/add/:userId', projectController.addMemberHandler);
router.put('/:projectId/members/remove/:userId', projectController.deleteMemberHandler);

export default router;