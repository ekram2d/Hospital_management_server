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
exports.tourController = void 0;
const tour_service_1 = require("../services/tour.service");
const createTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tourData = req.body;
        const result = yield tour_service_1.tourServices.createTour(tourData);
        res.status(201).json({
            status: 'success',
            message: 'Tour created successfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: error.message || 'Something went wrong',
        });
    }
});
const getAllTours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tour_service_1.tourServices.getAllTours();
        res.status(200).json({
            status: 'success',
            message: 'Tour fetched successfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: error.message || 'Something went wrong',
        });
    }
});
const getSingleTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield tour_service_1.tourServices.getSingleTour(id);
        res.status(200).json({
            status: 'success',
            message: 'Single Tour fetched successfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: error.message || 'Something went wrong',
        });
    }
});
const updateTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tourData = req.body;
        const id = req.params.id;
        const result = yield tour_service_1.tourServices.updateTour(id, tourData);
        res.status(200).json({
            status: 'success',
            message: 'Tour updated successfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: error.message || 'Something went wrong',
        });
    }
});
const getNextSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield tour_service_1.tourServices.getNextSchedule(id);
        res.status(200).json({
            status: 'success',
            message: 'Next Schedule fetched successfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: error.message || 'Something went wrong',
        });
    }
});
const deleteTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield tour_service_1.tourServices.deleteTour(id);
        res.status(200).json({
            status: 'success',
            message: 'Tour deleted successfully',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: error.message || 'Something went wrong',
        });
    }
});
exports.tourController = {
    createTour,
    getAllTours,
    getSingleTour,
    updateTour,
    deleteTour,
    getNextSchedule,
};
