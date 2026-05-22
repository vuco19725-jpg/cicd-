// Test file for AI review v2 - hardcoded secret
const PASSWORD = "admin123";
function query(db, name) { return db.execute("SELECT * FROM users WHERE name = \"" + name + "\""); }
