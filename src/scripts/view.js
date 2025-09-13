const pc = new RTCPeerConnection();
const videoEl = document.querySelector('video');

ws.addEventListener('open', () => {
  if (!videoEl) return;

  ws.send(JSON.stringify({ type: 'viewer' }));

  pc.addEventListener('track', (e) => {
    videoEl.srcObject = e.streams[0];
  });

  pc.addEventListener('icecandidate', (e) => {
    if (e.candidate) {
      ws.send(JSON.stringify({ type: 'candidate', candidate: e.candidate }));
    }
  });

  ws.addEventListener('message', async (e) => {
    const data = JSON.parse(e.data);

    switch (data.type) {
      case 'offer':
        {
          await pc.setRemoteDescription(data);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          ws.send(JSON.stringify(answer));
        }
        break;
      case 'candidate':
        await pc.addIceCandidate(data.candidate);
        break;
    }
  });
});
