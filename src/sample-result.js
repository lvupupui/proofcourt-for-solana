export function fallbackCourtResult(projectName, material, mode) {
  const hasRepo = /github\.com|repo|commit|pull request|readme/i.test(material);
  const hasToken = /token|mint|airdrop|tvl|staking|yield/i.test(material);
  const hasUsers = /customer|users|revenue|dao|pilot|traction/i.test(material);

  return {
    projectName,
    mode,
    verdict: {
      label: hasRepo ? "Watchlist" : "Needs Evidence",
      confidence: "Medium",
      oneLine: hasRepo
        ? "The project shows enough build evidence to continue diligence, but public traction and Solana integration depth still need proof."
        : "The pitch may be interesting, but the court needs stronger public evidence before recommending deeper engagement."
    },
    caseTheory:
      "ProofCourt treats the project material as testimony, then separates supported facts from claims that still need public proof.",
    prosecutor: {
      thesis: "The project is not yet proven by the supplied evidence.",
      arguments: [
        "The material contains product claims, but does not fully tie them to primary sources.",
        hasToken
          ? "Token or incentive language appears before the custody, utility, and authority model is fully established."
          : "No token risk is visible in the supplied material, but absence of evidence is not proof of safety.",
        hasUsers
          ? "Traction is mentioned, but the court needs named references, dashboards, or dated usage evidence."
          : "No concrete traction signal is visible from the supplied material."
      ]
    },
    defense: {
      thesis: "The project may still deserve attention if its claims can be verified quickly.",
      arguments: [
        hasRepo
          ? "A public repository or build artifact suggests the team may be shipping rather than only pitching."
          : "The concept can still be valid if the team provides a public repo, docs, or demo.",
        "The diligence workflow can turn thin evidence into a clear follow-up checklist instead of a vague rejection.",
        "If Solana is core to the product, program IDs, docs, and wallet flows should be straightforward to produce."
      ]
    },
    judge: {
      ruling:
        "Continue only if the team can provide primary evidence for Solana integration, shipping history, and traction. Do not treat social proof as sufficient.",
      nextActions: [
        "Request official docs, repository link, and mainnet/devnet program IDs.",
        "Ask for one dated customer, grant, or usage proof that can be independently checked.",
        "Run a static repo review before installing dependencies or connecting a wallet.",
        "Ask who controls upgrade authority or admin keys if user assets are involved."
      ]
    },
    evidence: [
      {
        claim: "The project has a defined Solana-related product direction.",
        label: "Inferred",
        source: "Submitted project material",
        confidence: "Medium",
        notes: "The material references Solana, but deeper integration evidence should be checked."
      },
      {
        claim: "The team has shipped a public technical artifact.",
        label: hasRepo ? "Observed" : "Not found",
        source: hasRepo ? "Repository or GitHub reference in material" : "Submitted project material",
        confidence: hasRepo ? "Medium" : "Low",
        notes: hasRepo ? "Repo activity still needs date and commit review." : "No public repo was visible in the input."
      },
      {
        claim: "The project has market traction.",
        label: hasUsers ? "Unverified" : "Not found",
        source: "Submitted project material",
        confidence: "Low",
        notes: "Traction claims require dashboards, customers, revenue proof, or credible third-party references."
      }
    ],
    contradictions: [
      {
        claim: "The project is ready for ecosystem trust.",
        problem: "Readiness cannot be established without primary evidence for code, users, and Solana integration.",
        whatWouldResolveIt: "Provide repo, docs, program IDs, demo, and dated usage proof."
      }
    ],
    riskRegister: [
      {
        risk: "Evidence quality",
        score: 3,
        evidence: "The supplied material is not enough to verify core claims.",
        mitigation: "Collect primary links and date every important claim."
      },
      {
        risk: "Solana integration depth",
        score: hasRepo ? 2 : 3,
        evidence: "Integration is described but not yet proven by chain or code evidence.",
        mitigation: "Verify program IDs, wallet flows, SDK usage, and deployment target."
      },
      {
        risk: "Traction quality",
        score: hasUsers ? 2 : 3,
        evidence: "Traction is either absent or self-reported.",
        mitigation: "Ask for named references, dashboards, or externally visible usage."
      },
      {
        risk: "Token and incentive clarity",
        score: hasToken ? 3 : 1,
        evidence: hasToken ? "Token/incentive language appears in the material." : "No token mechanics visible in the material.",
        mitigation: "Verify mint, authority, vesting, utility, and user asset exposure."
      }
    ],
    investorMemo: {
      whyNow:
        "Solana teams ship quickly, but ecosystem reviewers need faster ways to separate shipped proof from narrative.",
      wedge:
        "An evidence-first court workflow gives every claim a status: observed, inferred, unverified, contradicted, or not found.",
      moatQuestion:
        "Can the project turn its evidence workflow into a repeatable dataset or review standard for Solana grants, partnerships, and investments?",
      killerQuestion:
        "What public evidence would change the verdict from 'needs evidence' to 'proceed' within one week?"
    },
    generatedAt: new Date().toISOString(),
    engine: "local-fallback"
  };
}
