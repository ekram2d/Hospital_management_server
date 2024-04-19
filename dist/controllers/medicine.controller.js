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
exports.medicineController = void 0;
const patient_model_1 = require("../models/patient.model");
// Import your Medicine model interface
exports.medicineController = {
    createMedicine(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { medicine_name, price_per_unit, mg } = req.body;
                // Check if a medicine with the same name and mg already exists
                const existingMedicine = yield patient_model_1.Medicine.findOne({ medicine_name, mg });
                if (existingMedicine) {
                    return res.status(400).json({ message: 'Medicine already exists' });
                }
                // Create a new medicine instance
                const newMedicine = new patient_model_1.Medicine({
                    medicine_name,
                    price_per_unit,
                    mg,
                });
                // Save the new medicine to the database
                const savedMedicine = yield newMedicine.save();
                res.status(201).json(savedMedicine); // Send the saved medicine as response
            }
            catch (error) {
                console.error('Error creating medicine:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    },
    getAllMedicines(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.query; // Assuming you pass the medicine name as a query parameter
                const regex = new RegExp(name, 'i');
                const medicines = yield patient_model_1.Medicine.find({ medicine_name: regex });
                // const medicines = await Medicine.find() // Find all medicines in the database
                //const medicines = 'e'
                if (!medicines.length) {
                    return res.status(404).json({ message: 'No medicines found' });
                }
                res
                    .status(200)
                    .json({ message: 'Succesfully get the medicines', data: medicines }); // Send the list of medicines as response
            }
            catch (error) {
                console.error('Error fetching medicines:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    },
    getMedicineById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const medicine = yield patient_model_1.Medicine.findById(id); // Find medicine by ID
                if (!medicine) {
                    return res.status(404).json({ message: 'Medicine not found' });
                }
                res.status(200).json(medicine); // Send the medicine as response
            }
            catch (error) {
                console.error('Error fetching medicine by ID:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    },
    updateMedicine(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { medicine_name, price_per_unit, mg } = req.body;
                const updatedMedicine = yield patient_model_1.Medicine.findByIdAndUpdate(id, {
                    medicine_name,
                    price_per_unit,
                    mg,
                }, { new: true }); // Update medicine by ID
                if (!updatedMedicine) {
                    return res.status(404).json({ message: 'Medicine not found' });
                }
                res
                    .status(200)
                    .json({ message: 'successfully updated ', update: updatedMedicine }); // Send the updated medicine as response
            }
            catch (error) {
                console.error('Error updating medicine:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    },
    deleteMedicine(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedMedicine = yield patient_model_1.Medicine.findByIdAndDelete(id); // Delete medicine by ID
                if (!deletedMedicine) {
                    return res.status(404).json({ message: 'Medicine not found' });
                }
                res.status(200).json({ message: 'Medicine deleted successfully' });
            }
            catch (error) {
                console.error('Error deleting medicine:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    },
};
