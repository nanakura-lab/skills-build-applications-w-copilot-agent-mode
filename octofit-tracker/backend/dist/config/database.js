"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const octofit_db = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function connectToDatabase() {
    try {
        await mongoose_1.default.connect(octofit_db);
        console.log('Connected to MongoDB database: octofit_db');
    }
    catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
}
exports.default = {
    octofit_db,
    connectToDatabase,
};
