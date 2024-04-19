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
exports.reviewController = void 0;
const review_service_1 = require("../services/review.service");
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewData = req.body;
        const result = yield review_service_1.reviewServices.createReview(reviewData);
        res.status(201).json({
            status: 'success',
            message: 'Review created successfully',
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
const getAllReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield review_service_1.reviewServices.getAllReviews();
        res.status(200).json({
            status: 'success',
            message: 'Review fetched successfully',
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
const getSingleReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield review_service_1.reviewServices.getSingleReview(id);
        res.status(200).json({
            status: 'success',
            message: 'Single Review fetched successfully',
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
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewData = req.body;
        const id = req.params.id;
        const result = yield review_service_1.reviewServices.updateReview(id, reviewData);
        res.status(200).json({
            status: 'success',
            message: 'Review updated successfully',
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
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield review_service_1.reviewServices.deleteReview(id);
        res.status(200).json({
            status: 'success',
            message: 'Review deleted successfully',
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
exports.reviewController = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
};
