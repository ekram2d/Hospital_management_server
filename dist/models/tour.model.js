"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
//sSchema er upore Model nam er ekta type kaaj
//but amra TTOurModel diye amader Model type janaisi je amader ITourMethods kichu methods o ache
const tourSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name'],
    },
    durationHours: {
        type: Number,
        required: [true, 'Please tell us your durationHours'],
    },
    ratingAverage: {
        type: Number,
        default: 4.5,
    },
    ratingQuantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, 'Please tell us your price'],
    },
    imageCover: {
        type: String,
        required: [true, 'Please tell us your imageCover'],
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    startDates: [Date],
    startLocation: {
        type: String,
        required: [true, 'Please tell us your startLocation'],
    },
    locations: [String],
    slug: String,
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
tourSchema.virtual('durationDays').get(function () {
    return this.durationHours / 24;
});
tourSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id',
});
tourSchema.pre('save', function (next) {
    this.slug = (0, slugify_1.default)(this.name, { lower: true });
    next();
});
tourSchema.methods.getNextNearestStartDateAndEndDate = function () {
    const today = new Date();
    const futureDates = this.startDates.filter((startDate) => {
        return startDate > today;
    });
    //   65893905746394 - 4873843278478478
    futureDates.sort((a, b) => a.getTime() - b.getTime());
    const nearestStartDate = futureDates[0];
    const estimatedEndDate = new Date(nearestStartDate.getTime() + this.durationHours * 60 * 60 * 1000);
    return {
        nearestStartDate,
        estimatedEndDate,
    };
};
const Tour = (0, mongoose_1.model)('Tour', tourSchema);
exports.default = Tour;
//Fat Model Thin Controller
