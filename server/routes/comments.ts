import express, { Router } from 'express'
import * as commentController from '../controllers/commentController'

const router: Router = express.Router()

router.post('/', commentController.createCommentHandler)
router.get('/', commentController.getAllCommentsHandler)
router.get('/:id', commentController.getCommentByIdHandler)
router.put('/:id', commentController.updateCommentHandler)
router.delete('/:id', commentController.deleteCommentHandler)

export default router