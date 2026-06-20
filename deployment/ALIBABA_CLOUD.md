# Alibaba Cloud Deployment Notes

This file is prepared for the Qwen Cloud AI Agent Hackathon submission. It documents how ProofCourt can be deployed on Alibaba Cloud and what proof to capture for Devpost.

## Environment Variables

```bash
QWEN_API_KEY=your_qwen_cloud_api_key
QWEN_MODEL=qwen-plus
QWEN_BASE_URL=https://dashscope-intl.aliyuncs.com/compatible-mode/v1
PORT=3000
```

## Option A: Alibaba Cloud ECS

1. Create an ECS instance with Node.js 20+ or install Node manually.
2. Clone the public GitHub repository.
3. Install dependencies:

```bash
npm install
```

4. Create `.env` or configure system environment variables.
5. Start the app:

```bash
npm start
```

6. Open security group access to port 3000, or place Nginx in front of the Node app.

## Option B: Simple Application Server

1. Create a Node.js-capable Simple Application Server.
2. Upload or clone the repo.
3. Configure environment variables.
4. Run:

```bash
npm install
npm start
```

## Devpost Proof Checklist

Capture screenshots of:

- Alibaba Cloud console showing the running service or ECS instance.
- Environment variable configuration with the API key redacted.
- Public app URL loading the ProofCourt UI.
- One successful court result generated through Qwen Cloud.
- Server logs showing the app running.

## Notes

The app intentionally supports local fallback mode so the repository remains runnable without secrets. The deployed hackathon version should set `QWEN_API_KEY` so `/api/health` reports `qwenConfigured: true`.
