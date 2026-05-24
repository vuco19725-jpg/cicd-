const http = require("http");

const PORT = 8003;
let isReady = false;

// Liveness: is the process alive? No external dependencies.
function handleHealthz(res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("ok");
}

// Readiness: can this instance serve traffic?
function handleReadyz(res) {
  if (isReady) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ready", version: "1.0.0" }));
  } else {
    res.writeHead(503, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "not ready" }));
  }
}

// Main handler
function handleRequest(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from cicd-server
");
}

const server = http.createServer((req, res) => {
  if (req.url === "/healthz") return handleHealthz(res);
  if (req.url === "/readyz") return handleReadyz(res);
  handleRequest(req, res);
});

server.listen(PORT, () => {
  isReady = true;
  console.log("Server running on port " + PORT);
});
