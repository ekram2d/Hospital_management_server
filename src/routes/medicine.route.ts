import express from 'express'
import { medicineController } from '../controllers/medicine.controller'

const router = express.Router()

router.post('/medicines-create', medicineController.createMedicine) // Route to create a new medicine
router.get('/medicines-get', medicineController.getAllMedicines) // Route to get all medicines
router.get('/medicines-get/:id', medicineController.getMedicineById) // Route to get a single medicine by ID
router.put('/medicines-update/:id', medicineController.updateMedicine) // Route to update a medicine by ID
router.delete('/medicines-delete/:id', medicineController.deleteMedicine) // Route to delete a medicine by ID

export const medicineRoutes = router
