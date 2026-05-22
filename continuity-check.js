const fs = require("fs");
const path = require("path");

// ===== SETTINGS =====
const LAB_FOLDER = "./"; // change if labs in subfolder
const REQUIRED_ITEMS = {
  dashboard: "dashboard.html",
  cookie: "Cookie",
  score: "Score",
  background: "#000",
  themeColor: "#00ffcc",
  font: "Courier"
};

// ===== HELPERS =====
function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith(".html")) {
      results.push(fullPath);
    }
  });

  return results;
}

// ===== CHECK FUNCTION =====
function checkFile(file) {
  const content = fs.readFileSync(file, "utf8");

  let issues = [];

  if (!content.includes(REQUIRED_ITEMS.dashboard)) {
    issues.push("❌ Missing dashboard return");
  }

  if (!content.includes(REQUIRED_ITEMS.cookie)) {
    issues.push("❌ Missing Cookie UI");
  }

  if (!content.includes(REQUIRED_ITEMS.score)) {
    issues.push("❌ Missing score panel");
  }

  if (!content.includes(REQUIRED_ITEMS.background)) {
    issues.push("⚠ Background color mismatch");
  }

  if (!content.includes(REQUIRED_ITEMS.themeColor)) {
    issues.push("⚠ Theme color mismatch");
  }

  if (!content.includes(REQUIRED_ITEMS.font)) {
    issues.push("⚠ Font mismatch");
  }

  return issues;
}

// ===== RUN =====
function runCheck() {
  console.log("\n🛡 DEFENDERS CONTINUITY CHECK\n");

  const files = getAllHtmlFiles(LAB_FOLDER);

  let totalIssues = 0;

  files.forEach(file => {
    const issues = checkFile(file);

    if (issues.length > 0) {
      console.log(`\nFile: ${file}`);
      issues.forEach(issue => console.log("  " + issue));
      totalIssues += issues.length;
    }
  });

  if (totalIssues === 0) {
    console.log("✅ All labs consistent.");
  } else {
    console.log(`\n⚠ Total issues: ${totalIssues}`);
  }
}

runCheck();
