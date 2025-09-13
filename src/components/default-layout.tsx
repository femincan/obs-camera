import type { PropsWithChildren } from 'hono/jsx';
import { css, Style } from 'hono/css';

export function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
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
