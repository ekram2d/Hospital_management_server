"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorFeature = void 0;
const mongoose_1 = require("mongoose");
const doctorFeatureSchema = new mongoose_1.Schema({
    doctor_id: { type: String, required: true },
    name: { type: String, required: true },
    fee: { type: Number, required: true },
    duration: { type: Number, required: true },
    day: { type: String, required: true },
    durationTime: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    qualification: { type: String, required: true },
    recognition: { type: String, required: true },
    imgUrl: { type: String, required: true },
    active: { type: Boolean, default: true },
    patientsActive: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Patient' }],
    patientsInactive: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Patient' }],
});
const DoctorFeature = (0, mongoose_1.model)('DoctorFeature', doctorFeatureSchema);
exports.DoctorFeature = DoctorFeature;
