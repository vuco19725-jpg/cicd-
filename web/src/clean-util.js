// Clean utility - no issues
export function add(x, y) {
  return x + y;
}

export function greet(name) {
  if (!name || typeof name !== "string") {
    return "Hello, stranger!";
  }
  return "Hello, " + name + "!";
}
