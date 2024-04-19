"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorFeatureRoutes = void 0;
const express_1 = __importDefault(require("express"));
const doctorFeature_controller_1 = require("../controllers/doctorFeature.controller");
// Import the controller for doctor features
const router = express_1.default.Router();
router.post('/doctor-features-add', doctorFeature_controller_1.doctorFeatureController.createDoctorFeature);
router.get('/doctor-features', doctorFeature_controller_1.doctorFeatureController.getAllDoctorFeatures);
router.get('/doctor-features/:id', doctorFeature_controller_1.doctorFeatureController.getSingleDoctorFeature);
router.put('/doctor-features/:id', doctorFeature_controller_1.doctorFeatureController.updateDoctorFeature);
router.delete('/doctor-features/:id', doctorFeature_controller_1.doctorFeatureController.deleteDoctorFeature);
exports.doctorFeatureRoutes = router;
