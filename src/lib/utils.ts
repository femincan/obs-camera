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

export function generateScript(script: string, ip: string, port: number) {
  return `${generateWebSocket(ip, port)}${script}`;
}
