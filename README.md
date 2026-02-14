# Pathway 1 & 2 AI Tutor Bot (React + Cloudflare Worker)

This is a simple chat app made with React (Vite).  
It sends questions to a Cloudflare Worker API, and the Worker uses Cloudflare Workers AI (Llama 3) to respond.

The bot is meant to answer questions from **Pathway 1 and Pathway 2** only.

---

## What it does
- You type a question in the React app
- React sends it to the Worker endpoint: `/api/chat`
- The Worker calls the model: `@cf/meta/llama-3-8b-instruct`
- The response is returned and shown in the chat

---

## Live URLs
- **Frontend (deployed):** (paste your Netlify/Render URL here after deploying)
- **Worker API base URL:** `https://pathway-ai-tutor.johnnyjdavis1979.workers.dev`

API endpoint used by the frontend:
- `POST /api/chat`

Full endpoint:
- `https://pathway-ai-tutor.johnnyjdavis1979.workers.dev/api/chat`

---

## Running locally

### 1) Install
```bash
npm install
