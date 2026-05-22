const { test } = require("node:test");
const assert = require("node:assert");

test("server truthy check", () => {
  assert.strictEqual(2 + 2, 4);
});
