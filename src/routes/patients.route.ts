import express from 'express'
import { patientController } from '../controllers/paitents.controller'

// Import addPrescriptionsToPatient function

const router = express.Router()

router.post('/patients-create', patientController.createPatient) // Route to create a new patient
router.get('/patients-get/:doctorId', patientController.getPatientsByDoctor) // Route to get patients by doctor ID
router.get('/patients-get-single/:id', patientController.getSinglePatient) // Route to get a single patient by ID
router.get(
  '/prescriptions-filter',
  patientController.filterAndGroupPrescriptions,
)
router.put(
  '/add-prescriptions-to-patient',
  patientController.addPrescriptionsToPatient,
) // Route to add prescriptions to a patient
router.put('/patients-update/:id', patientController.updatePatient) // Route to update a patient by ID
router.delete('/patients-delete/:id', patientController.deletePatient) // Route to delete a patient by ID

// New route for filtering and grouping prescriptions

export const patientRoutes = router
