import { Hono } from 'hono';
import { websocket } from 'hono/bun';
import { getLocalIP } from './lib/utils.js';

const app = new Hono<{ Variables: { localIP: string } }>();

app.use('*', async (c, next) => {
  const localIP = getLocalIP();

  if (localIP === null) {
    c.status(500);
    return c.json({ error: 'Server IP is not found!' });
  }

  c.set('localIP', localIP);
  await next();
});

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

const CERT_DIR_PATH = `${import.meta.dir}/../cert`;
const server = Bun.serve({
  fetch: app.fetch,
  port: 3000,
  hostname: '0.0.0.0',
  tls: {
    cert: Bun.file(`${CERT_DIR_PATH}/cert.pem`),
    key: Bun.file(`${CERT_DIR_PATH}/key.pem`),
  },
  websocket,
});
console.log(`The server is running at: https://${getLocalIP()}:${server.port}`);
