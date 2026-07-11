import express, { Request, Response } from 'express';
import { AddressInfo } from 'net';
import { Activity, connectToDatabase, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Octofit Tracker API is running',
    baseUrl,
  });
});

app.get(['/api/users', '/api/users/'], async (_req: Request, res: Response) => {
  try {
    const users = await User.find({}).lean();
    res.json({ ok: true, endpoint: 'users', data: users });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Unable to load users' });
  }
});

app.get(['/api/teams', '/api/teams/'], async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find({}).lean();
    res.json({ ok: true, endpoint: 'teams', data: teams });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Unable to load teams' });
  }
});

app.get(['/api/activities', '/api/activities/'], async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find({}).lean();
    res.json({ ok: true, endpoint: 'activities', data: activities });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Unable to load activities' });
  }
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req: Request, res: Response) => {
  try {
    const leaderboard = await LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
    res.json({ ok: true, endpoint: 'leaderboard', data: leaderboard });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Unable to load leaderboard' });
  }
});

app.get(['/api/workouts', '/api/workouts/'], async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({}).lean();
    res.json({ ok: true, endpoint: 'workouts', data: workouts });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Unable to load workouts' });
  }
});

const server = app.listen(port, '0.0.0.0', async () => {
  await connectToDatabase();
  const address = server.address();
  const actualPort = typeof address === 'string' ? port : (address as AddressInfo).port;

  console.log(`Octofit API listening on http://0.0.0.0:${actualPort}`);
  console.log(`API base URL: ${baseUrl}`);
});
