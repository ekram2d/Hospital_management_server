import { Schema, model, Document } from 'mongoose'
import { IMedicine, IPatient } from '../interfaces/patient.interface'

// Define Medicine schema
interface IMedicineModel extends IMedicine, Document {}

const medicineSchema = new Schema<IMedicineModel>({
  medicine_name: { type: String, required: true },
  price_per_unit: { type: Number },
  mg: { type: Number },
})

// Define Prescription schema
const prescriptionSchema = new Schema({
  medicine_name: { type: String, required: true },
  price_per_unit: { type: Number },
  mg: { type: Number },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  duration: { type: String, required: true },
  notes: { type: String },
  followUpMessage: { type: String },
})

// Define Patient schema
interface IPatientModel extends IPatient, Document {}

const patientSchema = new Schema<IPatientModel>({
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
})

// Create and export models
const Patient = model<IPatientModel>('Patient', patientSchema)
const Medicine = model<IMedicineModel>('Medicine', medicineSchema)

export { Patient, Medicine }
