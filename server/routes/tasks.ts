import express, { Router } from 'express'
import * as taskController from '../controllers/taskController'

const router: Router = express.Router();

router.post('/', taskController.createTaskHandler)
router.get('/', taskController.getAllTasksHandler)
router.get('/:id', taskController.getTaskByIdHandler)
router.put('/:id', taskController.updateTaskHandler)
router.put("/:id/status", taskController.updateTaskStatus)
router.delete('/:id', taskController.deleteTaskHandler)

export default router