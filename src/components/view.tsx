import { css } from 'hono/css';
import { generateScript } from '../lib/utils';
import viewScript from '../scripts/view' with { type: 'text' };

const containerClass = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > video {
    display: block;
    width: 1080px;
    max-width: 100%;
    max-height: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
`;

export function View({ ip, port }: { ip: string; port: number }) {
  return (
    <>
      <div class={containerClass}>
        <video autoplay playsinline muted></video>
      </div>
      <script
        type='module'
        dangerouslySetInnerHTML={{
          __html: generateScript([viewScript], ip, port),
        }}
      ></script>
    </>
  );
}
