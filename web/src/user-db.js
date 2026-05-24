function getUserByName(db, name) { return db.query("SELECT * FROM users WHERE name = \"" + name + "\""); }
