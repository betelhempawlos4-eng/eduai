# EduAI — The Ultimate Student Platform

## Setup (one time only)

1. Open this folder in VS Code
2. Open the Terminal in VS Code (View → Terminal)
3. Run: `npm install`
4. Open the `.env` file and replace `your_new_api_key_here` with your real Anthropic API key
5. Run: `npm start`
6. Open your browser and go to: http://localhost:3000

## File structure

```
eduai/
├── public/
│   └── index.html    ← the full website UI
├── server.js         ← backend (keeps your API key safe)
├── .env              ← YOUR SECRET API KEY (never share this)
├── .gitignore        ← prevents .env from being uploaded to GitHub
└── package.json      ← project config
```

## To deploy online (Netlify/Vercel)

The backend (server.js) needs to be deployed to a server.
Recommended: deploy to Railway.app or Render.com (both free).
Then add your ANTHROPIC_API_KEY as an environment variable in their dashboard.
