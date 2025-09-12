import { generateWebSocket } from '../lib/utils';
import broadcastScript from '../scripts/broadcast' with { type: 'text' };

export function Broadcast({ ip, port }: { ip: string; port: number }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `${generateWebSocket(ip, port)}${broadcastScript}`,
        }}
      ></script>
    </>
  );
}
