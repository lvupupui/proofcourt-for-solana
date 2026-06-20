const form = document.querySelector("#court-form");
const engineStatus = document.querySelector("#engine-status");
const button = document.querySelector(".primary-action");

const els = {
  generatedAt: document.querySelector("#generated-at"),
  verdictCard: document.querySelector("#verdict-card"),
  memoWhy: document.querySelector("#memo-why"),
  memoKiller: document.querySelector("#memo-killer"),
  prosecutorThesis: document.querySelector("#prosecutor-thesis"),
  prosecutorList: document.querySelector("#prosecutor-list"),
  defenseThesis: document.querySelector("#defense-thesis"),
  defenseList: document.querySelector("#defense-list"),
  judgeRuling: document.querySelector("#judge-ruling"),
  judgeList: document.querySelector("#judge-list"),
  evidenceBoard: document.querySelector("#evidence-board"),
  contradictions: document.querySelector("#contradictions"),
  riskRegister: document.querySelector("#risk-register"),
  caseTheory: document.querySelector("#case-theory")
};

init();

async function init() {
  try {
    const res = await fetch("/api/health");
    const health = await res.json();
    engineStatus.textContent = health.qwenConfigured ? `Qwen Cloud: ${health.model}` : "demo mode: local fallback";
  } catch {
    engineStatus.textContent = "engine unavailable";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await runCourt(new FormData(form));
  });
}

async function runCourt(data) {
  button.disabled = true;
  button.textContent = "Court in session...";
  try {
    const res = await fetch("/api/court", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectName: data.get("projectName"),
        material: data.get("material"),
        mode: data.get("mode")
      })
    });
    const result = await res.json();
    if (!res.ok && result.fallback) {
      renderCourt(result.fallback);
      return;
    }
    if (!res.ok) throw new Error(result.message || result.error || "Court failed");
    renderCourt(result);
  } catch (error) {
    els.verdictCard.className = "verdict-card muted";
    els.verdictCard.innerHTML = `<span class="verdict-label">Court error</span><p>${escapeHtml(error.message)}</p>`;
  } finally {
    button.disabled = false;
    button.textContent = "Run Court Session";
  }
}

function renderCourt(result) {
  const verdictClass = result.verdict.label === "High Risk" ? "risk" : "ready";
  els.generatedAt.textContent = `${result.engine || "engine"} - ${new Date(result.generatedAt).toLocaleTimeString()}`;
  els.verdictCard.className = `verdict-card ${verdictClass}`;
  els.verdictCard.innerHTML = `
    <span class="verdict-label">${escapeHtml(result.verdict.label)}</span>
    <p><strong>${escapeHtml(result.verdict.confidence)} confidence.</strong> ${escapeHtml(result.verdict.oneLine)}</p>
  `;
  els.memoWhy.textContent = result.investorMemo.whyNow || "-";
  els.memoKiller.textContent = result.investorMemo.killerQuestion || "-";
  els.caseTheory.textContent = result.caseTheory || "The court mapped claims to evidence.";

  els.prosecutorThesis.textContent = result.prosecutor.thesis || "The weak claims";
  renderList(els.prosecutorList, result.prosecutor.arguments);
  els.defenseThesis.textContent = result.defense.thesis || "The strongest case";
  renderList(els.defenseList, result.defense.arguments);
  els.judgeRuling.textContent = result.judge.ruling || "-";
  renderList(els.judgeList, result.judge.nextActions);

  els.evidenceBoard.innerHTML = result.evidence.map((item) => `
    <article class="evidence-card">
      <span class="tag">${escapeHtml(item.label)} - ${escapeHtml(item.confidence)}</span>
      <h3>${escapeHtml(item.claim)}</h3>
      <p>${escapeHtml(item.notes)}</p>
      <p><strong>Source:</strong> ${escapeHtml(item.source)}</p>
    </article>
  `).join("");

  els.contradictions.innerHTML = result.contradictions.map((item) => `
    <div class="stack-item">
      <span class="tag">Contradiction</span>
      <p><strong>${escapeHtml(item.claim)}</strong></p>
      <p>${escapeHtml(item.problem)}</p>
      <p><strong>Resolve:</strong> ${escapeHtml(item.whatWouldResolveIt)}</p>
    </div>
  `).join("");

  els.riskRegister.innerHTML = result.riskRegister.map((item) => `
    <div class="risk-row">
      <span class="score">${Number(item.score)}</span>
      <div>
        <p><strong>${escapeHtml(item.risk)}</strong></p>
        <p>${escapeHtml(item.evidence)}</p>
        <p><strong>Mitigation:</strong> ${escapeHtml(item.mitigation)}</p>
      </div>
    </div>
  `).join("");
}

function renderList(target, items = []) {
  target.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
