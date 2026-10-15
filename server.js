const http = require('http');
const fs = require('fs');
const path = require('path');
const db = require('./db');

const PORT = process.env.PORT || 8081;
const STATE_FILE = path.join(__dirname, 'state.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  const pathname = req.url.split('?')[0];

  if (pathname === '/log_error_get') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }

  if (req.method === 'POST' && pathname === '/api/download') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const filename = (payload.filename || 'document.html').replace(/[^a-zA-Z0-9_.-]/g, '_');
        const content = payload.content || '';
        const mimeType = payload.mimeType || 'text/html; charset=utf-8';
        
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', mimeType);
        res.writeHead(200);
        res.end(content);
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid download payload');
      }
    });
    return;
  }

  // --- SQLite Database Status & Diagnostics ---
  if ((req.method === 'GET' || req.method === 'HEAD') && pathname === '/api/db/status') {
    const stats = db.getStats();
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    if (req.method === 'HEAD') return res.end();
    return res.end(JSON.stringify(stats, null, 2));
  }

  // --- SQLite State Persistence ---
  if ((req.method === 'GET' || req.method === 'HEAD') && pathname === '/api/state') {
    const stateRaw = db.getStateRaw() || (fs.existsSync(STATE_FILE) ? fs.readFileSync(STATE_FILE, 'utf8') : '{}');
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    if (req.method === 'HEAD') return res.end();
    return res.end(stateRaw);
  }

  if (req.method === 'POST' && pathname === '/api/state') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        db.saveState(parsed);
        try { fs.writeFileSync(STATE_FILE, JSON.stringify(parsed, null, 2), 'utf8'); } catch {}
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, message: 'Persisted to SQLite database and state.json' }));
      } catch (e) {
        console.error('POST /api/state Error:', e.message);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // --- CSD Inventory REST Endpoints (SQLite-backed) ---
  if ((req.method === 'GET' || req.method === 'HEAD') && pathname === '/api/csd/inventory') {
    const inv = db.getCsdInventory();
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    if (req.method === 'HEAD') return res.end();
    return res.end(JSON.stringify(inv));
  }

  if (req.method === 'POST' && pathname === '/api/csd/inventory') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const item = JSON.parse(body);
        db.saveCsdInventoryItem(item);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, item }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  if (req.method === 'DELETE' && pathname === '/api/csd/inventory') {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const id = parsedUrl.searchParams.get('id');
    if (id) {
      db.deleteCsdInventoryItem(id);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ success: true, deletedId: id }));
    }
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        if (payload.id) db.deleteCsdInventoryItem(payload.id);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, deletedId: payload.id }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // --- CSD Transactions REST Endpoints (SQLite-backed) ---
  if ((req.method === 'GET' || req.method === 'HEAD') && pathname === '/api/csd/transactions') {
    const txns = db.getCsdTransactions();
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    if (req.method === 'HEAD') return res.end();
    return res.end(JSON.stringify(txns));
  }

  if (req.method === 'POST' && pathname === '/api/csd/transactions') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const txn = JSON.parse(body);
        db.saveCsdTransaction(txn);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, txn }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // --- CSD Officers REST Endpoints (SQLite-backed) ---
  if ((req.method === 'GET' || req.method === 'HEAD') && pathname === '/api/csd/officers') {
    const officers = db.getCsdOfficers();
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    if (req.method === 'HEAD') return res.end();
    return res.end(JSON.stringify(officers));
  }

  if (req.method === 'POST' && pathname === '/api/csd/officers') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const officer = JSON.parse(body);
        db.saveCsdOfficer(officer);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, officer }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`eHRMS 2.0 Server running at http://localhost:${PORT}/`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`Port ${PORT} is in use, attempting port ${PORT + 1}...`);
    server.listen(PORT + 1);
  } else {
    console.error('Server error:', err);
  }
});
