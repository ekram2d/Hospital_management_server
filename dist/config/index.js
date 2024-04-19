"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join(process.cwd(), '.env'),
});
const config = {
    port: process.env.PORT,
    database_url_local: process.env.DATABASE_URL_LOCAL,
    database_url: process.env.DATABASE_URL,
    node_env: process.env.NODE_ENV,
    database_user_name: process.env.DATABASE_USER_NAME,
    database_password: process.env.DATABASE_USER_PASSWORD,
};
exports.default = config;
