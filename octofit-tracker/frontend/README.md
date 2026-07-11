# Octofit Tracker Frontend

This React 19 + Vite presentation tier connects to the Octofit Tracker API.

## Environment configuration

Create a local environment file at .env.local and define the Codespaces name before running the app:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

If VITE_CODESPACE_NAME is not set, the app falls back to the local backend URL rather than producing an undefined Codespaces URL.
