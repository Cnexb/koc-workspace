/*
 * Local save server for the KOC gallery.
 *
 * Serves the repo as a website and accepts one POST, api/save, which writes
 * data/state.js. That is what lets board messages and review decisions typed
 * in the browser land in the repo, ready to commit.
 *
 * Run:  node tools/serve.mjs      (or double-click start-board.cmd)
 */
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const PORT = Number(process.env.PORT) || 8123;
const STATE = join(ROOT, 'data', 'state.js');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2'
};

function stateFileText(posts, reviews) {
  return `/*
 * Published dashboard state: communication board posts and review decisions.
 *
 * The dashboard writes this file when you press Save, so it is the one file
 * that carries board messages and approvals into the repo. Hand-editing is
 * fine as long as the shape stays the same.
 */
KOC.board(${JSON.stringify(posts, null, 2)});

KOC.reviews(${JSON.stringify(reviews, null, 2)});
`;
}

function readBody(req) {
  return new Promise((ok, fail) => {
    let data = '';
    req.on('data', (c) => {
      data += c;
      if (data.length > 4e6) fail(new Error('payload too large'));
    });
    req.on('end', () => ok(data));
    req.on('error', fail);
  });
}

function json(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(body);
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = decodeURIComponent(url.pathname);

  if (path === '/api/ping') return json(res, 200, { ok: true, root: ROOT });

  if (path === '/api/save') {
    if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'use POST' });
    try {
      const payload = JSON.parse(await readBody(req));
      if (!Array.isArray(payload.posts) || typeof payload.reviews !== 'object' || payload.reviews === null) {
        return json(res, 400, { ok: false, error: 'expected { posts: [], reviews: {} }' });
      }
      await writeFile(STATE, stateFileText(payload.posts, payload.reviews), 'utf8');
      console.log(`saved data/state.js — ${payload.posts.length} messages, ` +
                  `${Object.keys(payload.reviews).length} review decisions`);
      return json(res, 200, { ok: true });
    } catch (e) {
      console.error('save failed:', e.message);
      return json(res, 500, { ok: false, error: e.message });
    }
  }

  // Static files, confined to the repo folder.
  const rel = normalize(path === '/' ? 'index.html' : path.replace(/^\/+/, ''));
  const file = join(ROOT, rel);
  if (!file.startsWith(ROOT + sep) && file !== join(ROOT, 'index.html')) {
    return json(res, 403, { ok: false, error: 'outside the repo' });
  }

  try {
    const body = await readFile(file);
    res.writeHead(200, {
      'Content-Type': MIME[extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found: ' + rel);
  }
});

server.listen(PORT, () => {
  console.log('KOC gallery — saving enabled');
  console.log('  open   http://localhost:' + PORT + '/');
  console.log('  writes ' + STATE);
  console.log('  stop   Ctrl+C');
});
