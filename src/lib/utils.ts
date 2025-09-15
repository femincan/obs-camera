import { networkInterfaces } from 'os';

export function getLocalIP() {
  const interfaces = networkInterfaces();
  for (const name in interfaces) {
    if (interfaces[name]) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  }

  return null;
}

export function generateWebSocket(ip: string, port: number) {
  return `const ws = new WebSocket('wss://${ip}:${port}');\n`;
}

// I use `unknown` as the script type because TypeScript doesn't know
// the types (string) of import attribute `{type: 'text'}`.
// We can add manual check later to make sure the input scripts types are `script`
export function generateScript(scripts: unknown[], ip: string, port: number) {
  let result = generateWebSocket(ip, port);
  for (const script of scripts) {
    result += script;
  }

  return result;
}
