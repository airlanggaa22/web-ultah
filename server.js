import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';

const root = resolve('dist');
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.ogg': 'audio/ogg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function respondWithError(response, statusCode, message) {
  response.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end(message);
}

async function serve(request, response) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    respondWithError(response, 405, 'Method Not Allowed');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    respondWithError(response, 400, 'Bad Request');
    return;
  }

  if (pathname === '/') pathname = '/index.html';
  if (pathname === '/admin' || pathname === '/admin/') pathname = '/admin.html';

  let filePath = resolve(root, `.${pathname}`);
  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
    respondWithError(response, 403, 'Forbidden');
    return;
  }

  let fileInfo;
  try {
    fileInfo = await stat(filePath);
    if (fileInfo.isDirectory()) {
      filePath = resolve(filePath, 'index.html');
      fileInfo = await stat(filePath);
    }
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') {
      respondWithError(response, 404, 'Not Found');
      return;
    }
    throw error;
  }

  if (!fileInfo.isFile()) {
    respondWithError(response, 404, 'Not Found');
    return;
  }

  response.writeHead(200, {
    'Content-Length': fileInfo.size,
    'Content-Type': contentTypes[extname(filePath).toLowerCase()] || 'application/octet-stream'
  });

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  const stream = createReadStream(filePath);
  stream.on('error', (error) => {
    console.error(`Failed to serve ${filePath}:`, error);
    if (response.headersSent) {
      response.destroy(error);
    } else {
      respondWithError(response, 500, 'Internal Server Error');
    }
  });
  stream.pipe(response);
}

const port = Number(process.env.PORT || 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`Invalid PORT value: ${process.env.PORT}`);
}

createServer((request, response) => {
  serve(request, response).catch((error) => {
    console.error('Failed to handle request:', error);
    if (response.headersSent) {
      response.destroy(error);
    } else {
      respondWithError(response, 500, 'Internal Server Error');
    }
  });
}).listen(port, '0.0.0.0', () => {
  console.log(`Web ultah is listening on port ${port}`);
});
