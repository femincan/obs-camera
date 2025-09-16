import { generateScript } from '../lib/utils';
import broadcastScript from '../scripts/broadcast' with { type: 'text' };

export function Broadcast({ ip, port }: { ip: string; port: number }) {
  return (
    <>
      <script
        type='module'
        dangerouslySetInnerHTML={{
          __html: generateScript([broadcastScript], ip, port),
        }}
      ></script>
    </>
  );
}
