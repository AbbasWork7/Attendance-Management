const fs = require('fs');
const https = require('https');
const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer({
  target: 'http://127.0.0.1:8000', // your backend API
  changeOrigin: true,
});

// Optional: handle proxy errors gracefully
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  if (!res.headersSent) {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
  }
  res.end('Bad gateway (proxy error)');
});

// Route all /api requests through the proxy
app.use('/api', (req, res) => {
  proxy.web(req, res);
});

// Fallback: serve static files or React build folder if needed
// app.use(express.static('build'));

// Load SSL certificates
const sslOptions = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.cert'),
};

const PORT = 8443;
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`🚀 HTTPS proxy listening on https://localhost:${PORT}`);
});
