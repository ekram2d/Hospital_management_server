"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourRoutes = void 0;
const express_1 = __importDefault(require("express"));
const tour_controller_1 = require("../controllers/tour.controller");
const router = express_1.default.Router();
router.post('/create-tour', tour_controller_1.tourController.createTour);
router.get('/', tour_controller_1.tourController.getAllTours);
router.get('/:id', tour_controller_1.tourController.getSingleTour);
router.patch('/:id', tour_controller_1.tourController.updateTour);
router.delete('/:id', tour_controller_1.tourController.deleteTour);
router.get('/:id/next-schedule', tour_controller_1.tourController.getNextSchedule);
exports.tourRoutes = router;
