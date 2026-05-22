// Test file for AI review — intentionally contains issues
const API_KEY = "sk-1234567890abcdef"; // Hardcoded secret

function getUserData(db, userId) {
  try {
    const sql = "SELECT * FROM users WHERE id = " + userId; // SQL injection
    return db.query(sql);
  } catch (e) {
    // Swallowed error
  }
}

function runCommand(userInput) {
  const { exec } = require("child_process");
  exec("ls " + userInput); // Command injection
}

module.exports = { getUserData, runCommand, API_KEY };
