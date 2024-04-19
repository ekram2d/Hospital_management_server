"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medicine = exports.Patient = void 0;
const mongoose_1 = require("mongoose");
const medicineSchema = new mongoose_1.Schema({
    medicine_name: { type: String, required: true },
    price_per_unit: { type: Number },
    mg: { type: Number },
});
// Define Prescription schema
const prescriptionSchema = new mongoose_1.Schema({
    medicine_name: { type: String, required: true },
    price_per_unit: { type: Number },
    mg: { type: Number },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
    notes: { type: String },
    followUpMessage: { type: String },
});
const patientSchema = new mongoose_1.Schema({
    doctorId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    contact: { type: String, required: true },
    appointment_date: { type: String, required: true },
    additional_notes: { type: String },
    active: { type: Boolean, default: true },
    prescriptions: [prescriptionSchema], // Array of prescription objects
});
// Create and export models
const Patient = (0, mongoose_1.model)('Patient', patientSchema);
exports.Patient = Patient;
const Medicine = (0, mongoose_1.model)('Medicine', medicineSchema);
exports.Medicine = Medicine;
