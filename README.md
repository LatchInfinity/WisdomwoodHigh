# WisdomwoodHigh

Wisdomwood High — Apply Now form.

## Live Site

Deployed via GitHub Pages:  
**https://latchinfinity.github.io/WisdomwoodHigh/**

## Tech Stack

- React 19 + TypeScript
- Vite 7

## Local Development

```bash
# Install dependencies
npm run install-all

# Start dev server
npm run dev
```

## Deploy to GitHub Pages

Deployment is **automatic** — every push to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys the client.

### First-time setup

1. Go to **Settings → Pages** in your GitHub repo.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push to `main` — the workflow will build `client/` and publish `client/dist/` to GitHub Pages.

### Manual trigger

You can also trigger a deploy manually from **Actions → Deploy to GitHub Pages → Run workflow**.
