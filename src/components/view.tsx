import { generateWebSocket } from '../lib/utils';
import viewScript from '../scripts/view' with { type: 'text' };

export function View({ ip, port }: { ip: string; port: number }) {
  return (
    <>
      <video autoplay playsinline muted></video>
      <script
        dangerouslySetInnerHTML={{
          __html: `${generateWebSocket(ip, port)}${viewScript}`,
        }}
      ></script>
    </>
  );
}
