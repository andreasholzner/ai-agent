# GitHub Actions Workflows

This directory contains automated workflows for the Climbing Log project.

## deploy-github-pages.yml

Automatically builds and deploys the app to GitHub Pages.

### Trigger Events

- **Push to main**: Automatically deploys when `climbing-log/src/` files change
- **Manual dispatch**: Can be triggered manually from the Actions tab

### Requirements

1. Repository must have GitHub Pages enabled
2. GitHub Pages source should be set to "GitHub Actions"

### Setup Instructions

1. Go to repository **Settings** → **Pages**
2. Under "Build and deployment" select:
   - Source: **GitHub Actions**
3. The workflow will automatically deploy on the next push or manual trigger

### What It Does

1. Checks out the repository code
2. Prepares GitHub Pages environment
3. Uploads the `climbing-log/src/` directory as the deployment artifact
4. Deploys to GitHub Pages

### View Deployment

After successful deployment:
- Check the **Actions** tab to view workflow runs
- Visit your GitHub Pages URL: `https://<username>.github.io/<repo>/climbing-log/src/`
- Each workflow run shows the deployment URL in the job summary

### Troubleshooting

**Workflow doesn't trigger:**
- Verify GitHub Pages is enabled in Settings → Pages
- Check that the workflow file is in the `main` branch

**Deployment fails:**
- Check the Actions tab for error logs
- Ensure `climbing-log/src/` directory exists with the required files

**Pages URL shows 404:**
- Wait a minute for GitHub to finish deploying
- Verify the path includes `climbing-log/src/` subdirectory
