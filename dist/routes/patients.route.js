"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRoutes = void 0;
const express_1 = __importDefault(require("express"));
const paitents_controller_1 = require("../controllers/paitents.controller");
// Import addPrescriptionsToPatient function
const router = express_1.default.Router();
router.post('/patients-create', paitents_controller_1.patientController.createPatient); // Route to create a new patient
router.get('/patients-get/:doctorId', paitents_controller_1.patientController.getPatientsByDoctor); // Route to get patients by doctor ID
router.get('/patients-get-single/:id', paitents_controller_1.patientController.getSinglePatient); // Route to get a single patient by ID
router.get('/prescriptions-filter', paitents_controller_1.patientController.filterAndGroupPrescriptions);
router.put('/add-prescriptions-to-patient', paitents_controller_1.patientController.addPrescriptionsToPatient); // Route to add prescriptions to a patient
router.put('/patients-update/:id', paitents_controller_1.patientController.updatePatient); // Route to update a patient by ID
router.delete('/patients-delete/:id', paitents_controller_1.patientController.deletePatient); // Route to delete a patient by ID
// New route for filtering and grouping prescriptions
exports.patientRoutes = router;
