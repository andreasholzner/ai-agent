# Climbing Log

A simple web app for tracking climbing ascents. Log routes, manage your climbing log, search and filter by area or style.

## Quick Start

See [src/README.md](src/README.md) for instructions on running the app locally with an HTTP server.

## Project Structure

- **specs/** — Project specifications
  - `climbing-log.md` — Original feature specification
  - `prototype.md` — Detailed prototype implementation specification
- **src/** — Source code
  - `log-climb.html` — Form for logging and editing ascents
  - `ascents.html` — Overview page with search and filter
  - `app.js` — Shared JavaScript utilities
  - `colors.css` — Design tokens and styling

## Deployment

This project includes a GitHub Actions workflow to automatically deploy the app to GitHub Pages on every push to `main`.

### Enable GitHub Pages Deployment

1. Go to your repository settings
2. Navigate to **Pages** section
3. Select **GitHub Actions** as the source
4. The workflow will automatically deploy on the next push to `main`

Once enabled, your app will be available at:
```
https://<your-username>.github.io/<your-repo>/climbing-log/src
```

The workflow triggers on:
- Pushes to `main` branch that modify files in `climbing-log/src/` or the workflow file
- Manual workflow dispatch (Actions tab → "Deploy to GitHub Pages" → "Run workflow")
