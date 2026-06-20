# ProofCourt for Solana

ProofCourt for Solana is a Qwen Cloud powered multi-agent evidence court for evaluating Solana projects before founders, investors, grant reviewers, or ecosystem teams spend serious time on them.

Instead of generating another generic diligence report, ProofCourt stages a structured cross-examination:

- Prosecutor Agent challenges unsupported claims.
- Defense Agent identifies the strongest evidence and reasonable interpretations.
- Judge Agent issues a verdict and next actions.
- Evidence Board labels every major claim as observed, inferred, unverified, contradicted, or not found.
- Contradiction Radar highlights gaps between pitch language and public proof.

## Why This Is Different

Most AI agent demos turn an input into a summary. ProofCourt turns a startup pitch into a courtroom-style decision system. The interface is designed to be memorable in a hackathon demo while still producing practical outputs: evidence, risk, contradictions, and investor memo questions.

## Built With

- Qwen Cloud OpenAI-compatible API
- Node.js and Express
- Static HTML/CSS/JavaScript frontend
- Alibaba Cloud deployment path documented for Devpost submission

The app runs in local fallback mode when `QWEN_API_KEY` is not configured, so reviewers can inspect the product flow without secrets.
It also supports Alibaba Cloud Model Studio workspace endpoints through `QWEN_BASE_URL`.

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev
```

Open:

```text
http://localhost:3000
```

To enable Qwen Cloud:

```bash
QWEN_API_KEY=your_key_here
QWEN_MODEL=qwen-plus
QWEN_BASE_URL=https://your-workspace-host.maas.aliyuncs.com/compatible-mode/v1
```

For Alibaba Cloud Model Studio workspaces, use the OpenAI-compatible address shown in the console. A local smoke test has confirmed the app returns `engine: "qwen-cloud"` when a valid workspace API key is configured.

## API

```http
POST /api/court
Content-Type: application/json
```

```json
{
  "projectName": "HelioVault",
  "mode": "investor",
  "material": "Project website, repo notes, token claims, docs, or pitch text..."
}
```

Returns:

- verdict
- prosecutor arguments
- defense arguments
- judge ruling
- evidence labels
- contradictions
- risk register
- investor memo

## Devpost Materials

- Architecture: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- Submission draft: [docs/DEVPOST_DRAFT.md](docs/DEVPOST_DRAFT.md)
- Alibaba Cloud deployment notes: [deployment/ALIBABA_CLOUD.md](deployment/ALIBABA_CLOUD.md)

## Safety

ProofCourt is not financial, legal, tax, or formal security advice. It treats all submitted project material as untrusted evidence. It never asks for private keys, seed phrases, wallet signing, or token transactions.

## License

MIT
