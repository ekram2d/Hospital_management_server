import express from 'express'
import { userController } from '../controllers/user.controller'

const router = express.Router()

router.post('/create-user', userController.createUser)
router.post('/login', userController.login)
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getSingleUser)
router.put('/user-role/:id', userController.updateUser) // Corrected route definition
router.delete('/:id', userController.deleteUser)

export const userRoutes = router
