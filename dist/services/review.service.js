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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewServices = void 0;
const review_model_1 = __importDefault(require("../models/review.model"));
const createReview = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.default.create(reviewData);
    if (result) {
        review_model_1.default.calcAverageRatings(result.tour);
    }
    return result;
});
const getAllReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.default.find().populate({
        path: 'user',
        select: 'name photo',
    });
    return result;
});
const getSingleReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.default.findById(id);
    return result;
});
const updateReview = (id, reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.default.findByIdAndUpdate(id, reviewData, {
        new: true,
        runValidators: true,
    });
    if (result) {
        yield review_model_1.default.calcAverageRatings(result.tour);
    }
    return result;
});
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.default.findByIdAndDelete(id);
    if (result) {
        yield review_model_1.default.calcAverageRatings(result.tour);
    }
    return result;
});
exports.reviewServices = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
};
