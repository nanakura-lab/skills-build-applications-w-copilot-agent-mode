"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importStar(require("mongoose"));
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'member' },
    fitnessGoal: { type: String, default: 'Build consistency' },
    createdAt: { type: Date, default: Date.now },
});
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    sport: { type: String, default: 'fitness' },
    members: [{ type: String }],
    captain: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
const activitySchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
});
const leaderboardSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    points: { type: Number, required: true },
    team: { type: String, default: 'Independent' },
    rank: { type: Number, required: true },
});
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    focus: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    level: { type: String, default: 'beginner' },
});
exports.User = (0, mongoose_1.model)('User', userSchema);
exports.Team = (0, mongoose_1.model)('Team', teamSchema);
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
exports.LeaderboardEntry = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
async function connectToDatabase() {
    if (mongoose_1.default.connection.readyState >= 1) {
        return mongoose_1.default.connection;
    }
    await mongoose_1.default.connect(mongoUri, {
        dbName: 'octofit_db',
    });
    return mongoose_1.default.connection;
}
