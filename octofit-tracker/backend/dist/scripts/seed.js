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
const models_1 = require("../models");
// Seed the octofit_db database with test data
async function seedDatabase() {
    try {
        await (0, models_1.connectToDatabase)();
        console.log('Connected to MongoDB for seeding');
        await Promise.all([
            models_1.User.deleteMany({}),
            models_1.Team.deleteMany({}),
            models_1.Activity.deleteMany({}),
            models_1.LeaderboardEntry.deleteMany({}),
            models_1.Workout.deleteMany({}),
        ]);
        const users = await models_1.User.insertMany([
            {
                name: 'Ava Patel',
                email: 'ava@example.com',
                role: 'captain',
                fitnessGoal: 'Improve endurance',
            },
            {
                name: 'Noah Kim',
                email: 'noah@example.com',
                role: 'member',
                fitnessGoal: 'Build strength',
            },
            {
                name: 'Mina Chen',
                email: 'mina@example.com',
                role: 'member',
                fitnessGoal: 'Train for a 10K',
            },
        ]);
        await models_1.Team.insertMany([
            {
                name: 'Velocity',
                sport: 'running',
                members: users.slice(0, 2).map((user) => user.name),
                captain: 'Ava Patel',
            },
            {
                name: 'Summit',
                sport: 'cross-training',
                members: [users[2].name],
                captain: 'Mina Chen',
            },
        ]);
        await models_1.Activity.insertMany([
            {
                userName: 'Ava Patel',
                type: 'run',
                durationMinutes: 35,
                calories: 420,
            },
            {
                userName: 'Noah Kim',
                type: 'strength',
                durationMinutes: 50,
                calories: 310,
            },
            {
                userName: 'Mina Chen',
                type: 'cycle',
                durationMinutes: 45,
                calories: 500,
            },
        ]);
        await models_1.LeaderboardEntry.insertMany([
            { name: 'Ava Patel', points: 1400, team: 'Velocity', rank: 1 },
            { name: 'Noah Kim', points: 1260, team: 'Velocity', rank: 2 },
            { name: 'Mina Chen', points: 1180, team: 'Summit', rank: 3 },
        ]);
        await models_1.Workout.insertMany([
            {
                title: 'Upper Body Strength',
                focus: 'strength',
                durationMinutes: 40,
                level: 'intermediate',
            },
            {
                title: 'HIIT Cardio',
                focus: 'cardio',
                durationMinutes: 25,
                level: 'advanced',
            },
            {
                title: 'Mobility Flow',
                focus: 'recovery',
                durationMinutes: 20,
                level: 'beginner',
            },
        ]);
        console.log('Seed completed successfully');
    }
    catch (error) {
        console.error('Seed failed', error);
        process.exitCode = 1;
    }
    finally {
        await Promise.resolve().then(() => __importStar(require('mongoose'))).then((mongoose) => mongoose.default.connection.close());
    }
}
seedDatabase();
