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
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        // Check if the email already exists
        const existingUser = yield user_model_1.default.findOne({ email: userData.email });
        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email already exists',
            });
        }
        // Create the user if the email doesn't exist
        const result = yield user_service_1.userServices.createUser(userData);
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
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
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // console.log(email)
        // Check if the user exists
        const user = yield user_model_1.default.findOne({ email });
        // console.log({ ji: 'kk' }, { user })
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Compare the provided password with the hashed password in the database
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, 'your_secret_key_here', {
            expiresIn: '1h',
        });
        // Send the JWT token along with user details in the response
        res.status(200).json({
            token,
            user: {
                name: user.name,
                role: user.role,
                email: user.email,
                id: user._id,
            },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUsers();
        res.status(200).json({
            status: 'success',
            message: 'User fetched successfully',
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
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield user_service_1.userServices.getSingleUser(id);
        res.status(200).json({
            status: 'success',
            message: 'Single User fetched successfully',
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
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const id = req.params.id;
        const result = yield user_service_1.userServices.updateUser(id, userData);
        res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
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
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield user_service_1.userServices.deleteUser(id);
        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
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
exports.userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    login,
};
