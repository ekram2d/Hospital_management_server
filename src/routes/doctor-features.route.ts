import express from 'express'
import { doctorFeatureController } from '../controllers/doctorFeature.controller'
// Import the controller for doctor features

const router = express.Router()

router.post('/doctor-features-add', doctorFeatureController.createDoctorFeature)
router.get('/doctor-features', doctorFeatureController.getAllDoctorFeatures)
router.get(
  '/doctor-features/:id',
  doctorFeatureController.getSingleDoctorFeature,
)
router.put('/doctor-features/:id', doctorFeatureController.updateDoctorFeature)
router.delete(
  '/doctor-features/:id',
  doctorFeatureController.deleteDoctorFeature,
)

export const doctorFeatureRoutes = router
