import fs from "fs";

const required = [
  "package.json",
  "src/server.js",
  "src/sample-result.js",
  "public/index.html",
  "public/styles.css",
  "public/app.js",
  "public/assets/court-lines.svg",
  "docs/ARCHITECTURE.md",
  "docs/DEVPOST_DRAFT.md",
  "deployment/ALIBABA_CLOUD.md",
  "README.md",
  "LICENSE"
];

const missing = required.filter((file) => !fs.existsSync(file));
if (missing.length) {
  console.error(`Missing files:\n${missing.join("\n")}`);
  process.exit(1);
}

const readme = fs.readFileSync("README.md", "utf8");
for (const needle of ["Qwen Cloud", "Alibaba Cloud", "ProofCourt", "Devpost"]) {
  if (!readme.includes(needle)) {
    console.error(`README missing: ${needle}`);
    process.exit(1);
  }
}

console.log("Project structure check passed.");
