const http = require("http");

const PORT = 8003;
let isReady = false;

function handleHealthz(res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("ok");
}

function handleReadyz(res) {
  if (isReady) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ready" }));
  } else {
    res.writeHead(503, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "not ready" }));
  }
}

const server = http.createServer((req, res) => {
  if (req.url === "/healthz") return handleHealthz(res);
  if (req.url === "/readyz") return handleReadyz(res);
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from cicd-server\n");
});

server.listen(PORT, () => {
  isReady = true;
  console.log("Server running on port " + PORT);
});
