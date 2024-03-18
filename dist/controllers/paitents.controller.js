"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientController = void 0;
const patient_model_1 = require("../models/patient.model");
// Controller method to create a new patient
const createPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('yes');
    try {
        const patientData = req.body;
        const doctorId = patientData.doctorId;
        const pastPatient = yield patient_model_1.Patient.findOne({
            email: patientData.email,
            doctorId: doctorId,
            active: true,
        });
        if (pastPatient &&
            pastPatient.doctorId === req.body.doctorId &&
            pastPatient.email === req.body.email) {
            return res
                .status(400)
                .json({ message: 'Patient already exists and is active' });
        }
        else {
            const newPatient = yield patient_model_1.Patient.create(patientData);
            return res.status(201).json({
                message: 'Patient created successfully',
                patientReport: newPatient,
            });
        }
    }
    catch (error) {
        console.error('Error creating patient:', error);
        return res.status(500).json({ error: 'Failed to create patient' });
    }
});
// Controller method to get all patients
const getPatientsByDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorId } = req.params;
    try {
        const patients = yield patient_model_1.Patient.find({
            doctorId: doctorId,
            active: true,
        });
        if (!patients || patients.length === 0) {
            return res
                .status(404)
                .json({ message: 'No patients found for this doctor' });
        }
        res.json(patients);
    }
    catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Failed to fetch patients' });
    }
});
// Controller method to get a single patient by ID
const getSinglePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const patient = yield patient_model_1.Patient.findOne({
            _id: id,
            active: true,
        });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    }
    catch (error) {
        console.error('Error fetching patient:', error);
        res.status(500).json({ error: 'Failed to fetch patient' });
    }
});
// Prescription model assuming Mongoose
// Controller function
const filterAndGroupPrescriptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, doctorId } = req.query;
    // Check if email is provided
    console.log(email, doctorId);
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    if (doctorId == undefined) {
        try {
            // Find all prescriptions for the given email and populate doctor details
            const prescriptions = yield patient_model_1.Patient.find({
                email: email,
            }).populate('doctorId');
            // Sort prescriptions by appointment_date
            prescriptions.sort((a, b) => {
                const dateA = new Date(a.appointment_date);
                const dateB = new Date(b.appointment_date);
                return dateA.getTime() - dateB.getTime();
            });
            res.json(prescriptions);
        }
        catch (error) {
            console.error('Error filtering and grouping prescriptions:', error);
            res
                .status(500)
                .json({ error: 'Failed to filter and group prescriptions' });
        }
    }
    else {
        try {
            // Find all prescriptions for the given email and populate doctor details
            const prescriptions = yield patient_model_1.Patient.find({
                email: email,
                doctorId: doctorId,
            }).populate('doctorId');
            // Sort prescriptions by appointment_date
            prescriptions.sort((a, b) => {
                const dateA = new Date(a.appointment_date);
                const dateB = new Date(b.appointment_date);
                return dateA.getTime() - dateB.getTime();
            });
            res.json(prescriptions);
        }
        catch (error) {
            console.error('Error filtering and grouping prescriptions:', error);
            res
                .status(500)
                .json({ error: 'Failed to filter and group prescriptions' });
        }
    }
});
// Sort prescriptions by appointment_date for each doctorId
const addPrescriptionsToPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        // Validate input data
        const { email, doctorId, prescriptions } = req.body;
        if (!email || !doctorId || !prescriptions) {
            return res.status(400).json({ message: 'Invalid request body' });
        }
        // Process prescriptions data
        const medicines = prescriptions.map((data) => ({
            medicine_name: data === null || data === void 0 ? void 0 : data.medicine_name,
            price_per_unit: data === null || data === void 0 ? void 0 : data.price_per_unit,
            mg: data === null || data === void 0 ? void 0 : data.mg,
        }));
        //console.log(medicines)
        // Update or create medicines
        // console.log(medicines)
        yield Promise.all(medicines.map((medicineData) => __awaiter(void 0, void 0, void 0, function* () {
            let existingMedicine = yield patient_model_1.Medicine.findOne({
                medicine_name: medicineData.medicine_name,
                mg: medicineData.mg,
            });
            console.log(existingMedicine);
            if (!existingMedicine) {
                existingMedicine = new patient_model_1.Medicine(medicineData);
            }
            yield existingMedicine.save(); // Await the save operation
        })));
        // Check if the patient exists and the doctor ID matches
        const patient = yield patient_model_1.Patient.findOne({ email, doctorId, active: true });
        if (!patient) {
            return res.status(404).json({
                status: 'fail',
                message: 'Patient not found or doctor ID does not match',
            });
        }
        // Find existing prescriptions based on medicine_name and mg
        const existingPrescriptions = yield patient_model_1.Patient.findOne({
            email,
            doctorId,
            active: true,
        });
        if ((existingPrescriptions === null || existingPrescriptions === void 0 ? void 0 : existingPrescriptions.prescriptions) && prescriptions) {
            const existingPrescriptions_data = existingPrescriptions === null || existingPrescriptions === void 0 ? void 0 : existingPrescriptions.prescriptions;
            const incomingPrescriptions = prescriptions;
            for (let i = incomingPrescriptions.length - 1; i >= 0; i--) {
                let flag = 0;
                for (let j = 0; j < existingPrescriptions_data.length; j++) {
                    if ((((_a = existingPrescriptions_data[j]) === null || _a === void 0 ? void 0 : _a.medicine_name) ==
                        ((_b = incomingPrescriptions[i]) === null || _b === void 0 ? void 0 : _b.medicine_name) &&
                        ((_c = existingPrescriptions_data[j]) === null || _c === void 0 ? void 0 : _c.mg) ==
                            ((_d = incomingPrescriptions[i]) === null || _d === void 0 ? void 0 : _d.mg)) ||
                        (((_e = existingPrescriptions_data[j]) === null || _e === void 0 ? void 0 : _e.mg) == null &&
                            ((_f = incomingPrescriptions[i]) === null || _f === void 0 ? void 0 : _f.mg) == null)) {
                        flag = 1;
                        break;
                    }
                }
                if (flag == 1) {
                    incomingPrescriptions.splice(i, 1);
                }
            }
            //console.log(incomingPrescriptions)
            //   // Add only unique prescriptions to the patient
            const result = yield patient_model_1.Patient.findOneAndUpdate({ email, doctorId, active: true }, { $addToSet: { prescriptions: { $each: incomingPrescriptions } } }, { new: true });
            //const updatedPatient = await patient.save()
            // Send a success response
            return res.status(200).json({
                status: 'success',
                message: 'Prescriptions added to patient successfully',
                data: result,
            });
        }
    }
    catch (error) {
        console.error('Error adding prescriptions to patient:', error);
        return res.status(500).json({
            status: 'fail',
            message: 'Something went wrong',
        });
    }
});
// Controller method to update a patient by ID
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { doctorId, active } = req.body; // doctorId received from req.body
    try {
        const updatedPatient = yield patient_model_1.Patient.findOneAndUpdate({ _id: id, doctorId, active: true }, // Ensure patient is already active
        { active }, { new: true });
        if (!updatedPatient) {
            return res.status(404).json({
                message: 'Patient not found for the provided ID, doctor ID, and active: true',
            });
        }
        res.json(updatedPatient);
    }
    catch (error) {
        console.error('Error updating patient role:', error);
        res.status(500).json({ error: 'Failed to update patient role' });
    }
});
// Controller method to delete a patient by ID
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedPatient = yield patient_model_1.Patient.findByIdAndDelete(id);
        if (!deletedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json({ message: 'Patient deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({ error: 'Failed to delete patient' });
    }
});
exports.patientController = {
    createPatient,
    getPatientsByDoctor,
    getSinglePatient,
    updatePatient,
    deletePatient,
    addPrescriptionsToPatient,
    filterAndGroupPrescriptions,
};
