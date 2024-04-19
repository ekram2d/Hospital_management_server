"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
// doctorFeature.controller.ts
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
exports.doctorFeatureController = void 0;
const doctorFeature_model_1 = require("../models/doctorFeature.model");
// Import the DoctorFeature model
// Controller method to create a new doctor feature
const createDoctorFeature = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorFeatureData = req.body;
        console.log(doctorFeatureData);
        // Check if a doctor feature with the same name already exists
        const existingFeature = yield doctorFeature_model_1.DoctorFeature.findOne({
            doctor_id: doctorFeatureData.doctor_id,
        });
        if (existingFeature) {
            return res.status(400).json({
                status: 'fail',
                message: 'Doctor feature with the same doctor already exists',
            });
        }
        // If no existing feature found, create the new one
        const result = yield doctorFeature_model_1.DoctorFeature.create(doctorFeatureData);
        res.status(201).json({
            status: 'success',
            message: 'Doctor feature created successfully',
            data: result,
        });
    }
    catch (error) {
        console.error('Error creating doctor feature:', error);
        res.status(500).json({
            status: 'fail',
            message: error.message || 'Something went wrong',
        });
    }
});
// Controller method to get all doctor features
const getAllDoctorFeatures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctor = yield doctorFeature_model_1.DoctorFeature.find({}).select('-patientsActive -patientsInactive');
        res.status(200).json({
            status: 'success',
            message: 'Doctor features fetched successfully',
            data: doctor,
        });
    }
    catch (error) {
        console.error('Error fetching doctor features:', error);
        res.status(500).json({
            status: 'fail',
            message: error.message || 'Something went wrong',
        });
    }
});
// Controller method to get a single doctor feature by ID
const getSingleDoctorFeature = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const doctorFeature = yield doctorFeature_model_1.DoctorFeature.findOne({
            doctor_id: id,
        }).populate('patientsActive');
        if (!doctorFeature) {
            return res.status(404).json({
                status: 'fail',
                message: 'Doctor feature not found',
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Doctor feature fetched successfully',
            data: doctorFeature,
        });
    }
    catch (error) {
        console.error('Error fetching doctor feature:', error);
        res.status(500).json({
            status: 'fail',
            message: error.message || 'Something went wrong',
        });
    }
});
// Controller method to update a doctor feature by ID
const updateDoctorFeature = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const doctorFeatureData = req.body;
        const updatedDoctorFeature = yield doctorFeature_model_1.DoctorFeature.findByIdAndUpdate(id, doctorFeatureData, {
            new: true,
            runValidators: true,
        });
        if (!updatedDoctorFeature) {
            return res.status(404).json({
                status: 'fail',
                message: 'Doctor feature not found',
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Doctor feature updated successfully',
            data: updatedDoctorFeature,
        });
    }
    catch (error) {
        console.error('Error updating doctor feature:', error);
        res.status(500).json({
            status: 'fail',
            message: error.message || 'Something went wrong',
        });
    }
});
// Controller method to delete a doctor feature by ID
const deleteDoctorFeature = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedDoctorFeature = yield doctorFeature_model_1.DoctorFeature.findByIdAndDelete(id);
        if (!deletedDoctorFeature) {
            return res.status(404).json({
                status: 'fail',
                message: 'Doctor feature not found',
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Doctor feature deleted successfully',
        });
    }
    catch (error) {
        console.error('Error deleting doctor feature:', error);
        res.status(500).json({
            status: 'fail',
            message: error.message || 'Something went wrong',
        });
    }
});
exports.doctorFeatureController = {
    createDoctorFeature,
    getAllDoctorFeatures,
    getSingleDoctorFeature,
    updateDoctorFeature,
    deleteDoctorFeature,
};
