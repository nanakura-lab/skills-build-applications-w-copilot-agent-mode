"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = exports.app = void 0;
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
exports.app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
exports.baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
exports.app.get('/', (_req, res) => {
    res.json({
        message: 'Octofit Tracker API is running',
        baseUrl: exports.baseUrl,
    });
});
exports.app.get(['/api/users', '/api/users/'], async (_req, res) => {
    try {
        const users = await models_1.User.find({}).lean();
        res.json({ ok: true, endpoint: 'users', data: users });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: 'Unable to load users' });
    }
});
exports.app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    try {
        const teams = await models_1.Team.find({}).lean();
        res.json({ ok: true, endpoint: 'teams', data: teams });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: 'Unable to load teams' });
    }
});
exports.app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    try {
        const activities = await models_1.Activity.find({}).lean();
        res.json({ ok: true, endpoint: 'activities', data: activities });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: 'Unable to load activities' });
    }
});
exports.app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    try {
        const leaderboard = await models_1.LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
        res.json({ ok: true, endpoint: 'leaderboard', data: leaderboard });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: 'Unable to load leaderboard' });
    }
});
exports.app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    try {
        const workouts = await models_1.Workout.find({}).lean();
        res.json({ ok: true, endpoint: 'workouts', data: workouts });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: 'Unable to load workouts' });
    }
});
async function startServer() {
    const server = exports.app.listen(port, '0.0.0.0', async () => {
        await (0, models_1.connectToDatabase)();
        const address = server.address();
        const actualPort = typeof address === 'string' ? port : address.port;
        console.log(`Octofit API listening on http://0.0.0.0:${actualPort}`);
        console.log(`API base URL: ${exports.baseUrl}`);
    });
    return server;
}
