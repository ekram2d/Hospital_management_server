"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./routes/user.route");
const doctor_features_route_1 = require("./routes/doctor-features.route");
const patients_route_1 = require("./routes/patients.route");
const medicine_route_1 = require("./routes/medicine.route");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use('/api/v1/users', user_route_1.userRoutes);
app.use('/api/v1/doctors', doctor_features_route_1.doctorFeatureRoutes);
app.use('/api/v1/patients', patients_route_1.patientRoutes);
app.use('/api/v1/medicine', medicine_route_1.medicineRoutes);
// Default route
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to the doctor pages',
    });
});
// Error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    console.error('error', err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
exports.default = app;
