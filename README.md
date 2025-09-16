# OBS Camera

OBS Camera lets you use your phone (or any device with a camera on your local network) as a camera source in OBS Studio (via browser source) using a WebRTC connection.

## Features

- Secure HTTPS and WebSocket signaling (TLS)
- Broadcast from any device with a camera and browser
- Viewer mode for receiving and displaying the stream
- Simple UI, fullscreen support, and wake lock for uninterrupted streaming

## Intention, Pros, and Cons

I created this project to use my phone's camera in OBS via the browser source.  
A key advantage is the ability to easily customize the video output in OBS using custom CSS such as making the video circular.

Currently, the streaming quality is not optimal, and I have not found a solution yet. The quality improves over time after starting the stream (but won't be the best), typically taking 30 to 60 seconds.

## Caution ⚠️

This project is not intended to be published online. It is designed to work offline on your local network. Exposing the server to the internet may introduce security vulnerabilities if you are not careful.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime
- TLS certificates (`cert/cert.pem` and `cert/key.pem`). You should create a `cert` directory at the project root and add `cert.pem` and `key.pem` files inside it. You can use [`mkcert`](https://github.com/FiloSottile/mkcert) for this.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/femincan/obs-camera.git
   cd obs-camera
   ```

2. Install dependencies:

   ```sh
   bun install
   ```

3. Create the `cert/` directory and add your TLS certificates into it.

### Running the Server

Start the development server:

```sh
bun run dev
```

The server will run at `https://<your-local-ip>:3000`.

### Building for Easy Usage

This build method is designed for easy and efficient usage, not for production deployment. After building, you can simply run the binary manually or set up automation.

```sh
bun run build
```

The output will be in the `dist/` directory as a binary.  
**Note:** The build output is currently set for macOS only. To build for Linux or Windows, adjust the `compile.target` setting in [`build.ts`](./build.ts).

## Usage

- **Broadcast:** Open `https://<your-local-ip>:3000/broadcast` on your phone or device with a camera. The website is pure black to reduce battery usage on AMOLED screens. You can double tap anywhere on the screen to enable fullscreen and wake lock. Double tap again to disable fullscreen and wake lock.
- **View:** Open `https://<your-local-ip>:3000/view` in OBS Studio (browser source) or any browser to view the stream.

## Project Structure

- `src/` - Source code
  - `components/` - Hono JSX components for broadcast and view pages
  - `scripts/` - Client-side scripts for WebRTC logic
  - `lib/` - Utility functions
- `cert/` - TLS certificates (You should create this directory manually)
- `build.ts` - Build script for Bun

## Security

- The `cert/` directory is included in `.gitignore` to prevent TLS certificates from being committed to version control.
- Keep your TLS certificates (`cert/cert.pem` and `cert/key.pem`) private. Do not share or publish these files.

**Important**: This project is designed for local/offline use only. It should not be deployed to the public internet. If you do so, you are responsible for implementing proper authentication, TLS from a trusted CA, and access restrictions.

## License

The project is licensed under [MIT](./LICENSE) license.
