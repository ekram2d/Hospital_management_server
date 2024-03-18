"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicineRoutes = void 0;
const express_1 = __importDefault(require("express"));
const medicine_controller_1 = require("../controllers/medicine.controller");
const router = express_1.default.Router();
router.post('/medicines-create', medicine_controller_1.medicineController.createMedicine); // Route to create a new medicine
router.get('/medicines-get', medicine_controller_1.medicineController.getAllMedicines); // Route to get all medicines
router.get('/medicines-get/:id', medicine_controller_1.medicineController.getMedicineById); // Route to get a single medicine by ID
router.put('/medicines-update/:id', medicine_controller_1.medicineController.updateMedicine); // Route to update a medicine by ID
router.delete('/medicines-delete/:id', medicine_controller_1.medicineController.deleteMedicine); // Route to delete a medicine by ID
exports.medicineRoutes = router;
