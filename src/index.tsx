import { Hono } from 'hono';
import { websocket, upgradeWebSocket } from 'hono/bun';
import type { WSContext } from 'hono/ws';
import { jsxRenderer } from 'hono/jsx-renderer';
import * as z from 'zod';
import { getLocalIP } from './lib/utils';
import { DefaultLayout, Broadcast, View } from './components';

const HOSTNAME = '0.0.0.0';
const PORT = 3000;
const app = new Hono<{ Variables: { ip: string; port: number } }>();

app.use('*', async (c, next) => {
  const ip = getLocalIP();
  const port = server.port;

  if (!ip || !port) {
    c.status(500);
    return c.json({ error: 'Server IP is not found!' });
  }

  c.set('ip', ip);
  c.set('port', port);
  await next();
});
app.use('*', jsxRenderer(DefaultLayout, { docType: true }));

const dataSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('broadcaster'),
  }),
  z.object({
    type: z.literal('viewer'),
  }),
  z.object({
    type: z.enum(['offer', 'answer']),
    sdp: z.string(),
  }),
  z.object({
    type: z.literal('candidate'),
    candidate: z.object(),
  }),
]);

let broadcaster: WSContext | null = null;
let viewer: WSContext | null = null;

app.get(
  '/',
  upgradeWebSocket(() => ({
    onMessage: (e, ws) => {
      const message = e.data as string;
      const { data, success } = dataSchema.safeParse(JSON.parse(message));

      if (!success) return;

      switch (data.type) {
        case 'broadcaster':
          if (broadcaster) return;

          // Set broadcaster and offer
          broadcaster = ws;

          // Send an offer request to braodcaster if viewer exists
          if (viewer) {
            ws.send(JSON.stringify({ type: 'offer' }));
          }
          break;

        case 'viewer':
          if (viewer) return;

          // Set viewer
          viewer = ws;

          // Send an offer request to broadcaster if broadcaster exists
          if (broadcaster) {
            broadcaster.send(JSON.stringify({ type: 'offer' }));
          }
          break;

        case 'offer':
          if (!viewer) return;

          viewer.send(message);
          break;

        case 'answer':
          if (!broadcaster || !viewer) return;

          // Send answer to broadcaster
          broadcaster.send(message);
          break;

        case 'candidate':
          if (!broadcaster || !viewer) return;

          // Send ICE candidate broadcaster to viewer
          if (ws.raw === broadcaster.raw) {
            viewer.send(message);
          } else {
            // Send ICE candidate viewer to broadcaster
            broadcaster.send(message);
          }
          break;
      }
    },
    onClose: (_, ws) => {
      // Broadcaster has been closed its connection
      if (broadcaster && ws.raw === broadcaster.raw) {
        broadcaster = null;
      }

      // Viwer has been closed its connection
      if (viewer && ws.raw === viewer.raw) {
        viewer = null;
      }
    },
  })),
);

app.get('/broadcast', (c) => {
  const ip = c.get('ip');
  const port = c.get('port');
  return c.render(<Broadcast ip={ip} port={port} />);
});

app.get('/view', (c) => {
  const ip = c.get('ip');
  const port = c.get('port');
  return c.render(<View ip={ip} port={port} />);
});

const CERT_DIR_PATH = `${import.meta.dir}/../cert`;
const server = Bun.serve({
  fetch: app.fetch,
  port: PORT,
  hostname: HOSTNAME,
  tls: {
    cert: Bun.file(`${CERT_DIR_PATH}/cert.pem`),
    key: Bun.file(`${CERT_DIR_PATH}/key.pem`),
  },
  websocket,
});
console.log(`The server is running at: https://${getLocalIP()}:${server.port}`);
