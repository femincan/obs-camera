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
