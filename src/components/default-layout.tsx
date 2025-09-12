import type { PropsWithChildren } from 'hono/jsx';

export function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>OBS Camera</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
