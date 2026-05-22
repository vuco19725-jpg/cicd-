// Simple greeting module - no security issues
function greet(name) {
  if (!name || typeof name !== "string") {
    return "Hello, stranger!";
  }
  return "Hello, " + name.trim() + "!";
}

function formatGreeting(name, lang) {
  const greetings = {
    en: "Hello",
    zh: "你好",
    ja: "こんにちは"
  };
  const prefix = greetings[lang] || greetings.en;
  return prefix + ", " + greet(name).split(", ")[1];
}

module.exports = { greet, formatGreeting };
