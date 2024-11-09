const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 443;

// Set up SSL certificates
const sslOptions = {
  key: fs.readFileSync('/etc/ssl/app-sec/app-sec.key'),       
  cert: fs.readFileSync('/etc/ssl/app-sec/app-sec.crt'),    
};

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Redirect all other requests to the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});

// Create an HTTP server to redirect to HTTPS
http.createServer((req, res) => {
  // Redirect all incoming requests to HTTPS
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(80, () => {
  console.log('HTTP Server is redirecting all traffic to HTTPS on port 443');
});
