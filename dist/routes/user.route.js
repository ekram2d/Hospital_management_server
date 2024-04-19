"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.post('/create-user', user_controller_1.userController.createUser);
router.post('/login', user_controller_1.userController.login);
router.get('/', user_controller_1.userController.getAllUsers);
router.get('/:id', user_controller_1.userController.getSingleUser);
router.put('/user-role/:id', user_controller_1.userController.updateUser); // Corrected route definition
router.delete('/:id', user_controller_1.userController.deleteUser);
exports.userRoutes = router;
