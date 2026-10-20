import http from 'node:http';

const PORT = 3055;
const clients = new Set();

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'online',
      activeClients: clients.size,
      time: new Date().toISOString()
    }));
    return;
  }

  if (url.pathname === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    res.write('event: connected\ndata: {"status":"connected"}\n\n');

    clients.add(res);
    console.log(`[Bridge] Figma client connected (total: ${clients.size})`);

    req.on('close', () => {
      clients.delete(res);
      console.log(`[Bridge] Figma client disconnected (total: ${clients.size})`);
    });
    return;
  }

  if (url.pathname === '/push' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const dataStr = `data: ${JSON.stringify(payload)}\n\n`;
        let sent = 0;
        clients.forEach(client => {
          client.write(dataStr);
          sent++;
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, deliveredTo: sent }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`[Bridge Server] Running on http://localhost:${PORT}`);
  console.log(`[Bridge Server] Ready to stream commands to Figma`);
});
