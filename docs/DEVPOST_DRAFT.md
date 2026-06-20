# Devpost Draft

## Project Name

ProofCourt for Solana

## Tagline

A Qwen Cloud powered evidence court that cross-examines Solana projects before founders, investors, and grant reviewers trust their claims.

## Inspiration

Most AI diligence tools produce a polished report too quickly. In crypto, that can be dangerous: project pages often mix real evidence, optimistic claims, token incentives, and missing proof. ProofCourt was inspired by the idea that an AI agent should not merely summarize a project. It should put claims on trial.

## What It Does

ProofCourt takes a Solana project name and evidence packet, then stages a structured court session:

- Prosecutor Agent challenges unsupported claims.
- Defense Agent identifies the strongest supporting evidence.
- Judge Agent issues a verdict and concrete next actions.
- Evidence Board labels claims as observed, inferred, unverified, contradicted, or not found.
- Contradiction Radar highlights gaps between pitch language and public proof.
- Risk Register scores key diligence risks.

## How We Built It

The app uses a Node.js Express backend and a static frontend. The backend calls Qwen Cloud through its OpenAI-compatible chat completions API and requests strict JSON output. The frontend renders the result as a court-style decision system rather than a chatbot transcript.

The project includes a local fallback engine so judges can inspect the product flow even without API secrets.

## Use Of Qwen Cloud

Qwen Cloud powers the multi-role reasoning step. The model receives the project evidence packet and returns structured JSON for the Prosecutor, Defense, Judge, Evidence Board, Contradiction Radar, Risk Register, and Investor Memo.

## Use Of Alibaba Cloud

The intended deployment path is Alibaba Cloud ECS or Simple Application Server running the Node/Express app with Qwen API environment variables. The deployment document explains the exact environment variables, startup command, and proof screenshots to include.

## What Makes It Different

ProofCourt is not a generic report generator. It uses a courtroom metaphor to force adversarial review:

- claims must be labeled
- uncertainty must remain visible
- contradictions get their own surface
- the final answer is a ruling with next evidence checks

This makes the demo memorable and the output more useful for real Solana ecosystem decisions.

## Challenges

The main challenge was balancing a dramatic product experience with a practical diligence workflow. The app needs to feel distinct in a hackathon demo, but still produce outputs a founder, investor, grant reviewer, or partner lead can actually use.

## What's Next

- Add source fetching for GitHub, project docs, and Solana explorers.
- Add exportable PDF investor memos.
- Store repeated court sessions for benchmark comparisons.
- Add a public evidence dataset for Solana grants and hackathon projects.

## Links

- GitHub: https://github.com/lvupupui/proofcourt-for-solana
- Demo: to be added after deployment
- Video: to be added after recording
