import { generateWebSocket } from '../lib/utils';
import mainScript from '../scripts/main' with { type: 'text' };

export function Main({ ip, port }: { ip: string; port: number }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `${generateWebSocket(ip, port)}${mainScript}`,
        }}
      ></script>
    </>
  );
}
