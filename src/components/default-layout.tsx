import type { PropsWithChildren } from 'hono/jsx';
import { css, Style } from 'hono/css';
import faviconEncoded from '../assets/favicon-encoded';

export function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link
          rel='shortcut icon'
          type='image/svg+xml'
          href={`data:image/svg+xml,${faviconEncoded}`}
        />
        <title>OBS Camera</title>
        <Style>
          {css`
            * {
              margin: 0;
              padding: 0;
            }
            html,
            body {
              height: 100vh;
              width: 100vw;
              max-width: 100%;
              max-height: 100vh;
            }
            body {
              background-color: black;
            }
          `}
        </Style>
      </head>
      <body>{children}</body>
    </html>
  );
}
