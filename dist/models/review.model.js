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
const mongoose_1 = require("mongoose");
const tour_model_1 = __importDefault(require("./tour.model"));
const reviewSchema = new mongoose_1.Schema({
    review: {
        type: String,
        required: [true, 'Please tell us your review'],
    },
    rating: {
        type: Number,
        required: [true, 'Please tell us your rating'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    tour: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Tour',
        required: [true, 'Please tell us your tour'],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please tell us your user'],
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });
reviewSchema.statics.calcAverageRatings = function (tourId) {
    return __awaiter(this, void 0, void 0, function* () {
        //tourId newObjectId("2vj3ffvgcd")
        //this refers the Review  Model
        const stats = yield this.aggregate([
            {
                $match: { tour: tourId },
            },
            {
                $group: {
                    _id: '$tour',
                    numberOfRatings: { $sum: 1 },
                    avgRating: { $avg: '$rating' },
                },
            },
        ]);
        if (stats.length > 0) {
            yield tour_model_1.default.findByIdAndUpdate(tourId, {
                ratingAverage: stats[0].numberOfRatings,
                ratingQuantity: stats[0].avgRating,
            });
        }
        else {
            yield tour_model_1.default.findByIdAndUpdate(tourId, {
                ratingAverage: 0,
                ratingQuantity: 0,
            });
        }
    });
};
const Review = (0, mongoose_1.model)('Review', reviewSchema);
exports.default = Review;
