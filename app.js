// Plesk/Passenger startup file for Next.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Rewrite /assets/_next/* to /_next/* so Next.js can serve static files
    if (req.url.startsWith('/assets/_next/')) {
      req.url = req.url.replace('/assets/_next/', '/_next/');
    }
    handle(req, res, parse(req.url, true));
  }).listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log('Next.js server ready');
  });
});
