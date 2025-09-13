const pc = new RTCPeerConnection();

document.body.addEventListener('dblclick', async () => {
  if (!document.fullscreenElement) {
    await document.body.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
});

ws.addEventListener('open', async () => {
  const stream = await getUserMedia();

  if (!stream) return;

  ws.send(JSON.stringify({ type: 'broadcaster' }));

  stream.getTracks().forEach((track) => pc.addTrack(track, stream));

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
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          ws.send(JSON.stringify(offer));
        }
        break;
      case 'answer':
        await pc.setRemoteDescription(data);
        break;
      case 'candidate':
        await pc.addIceCandidate(data.candidate);
        break;
    }
  });
});

async function getUserMedia() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        aspectRatio: 1,
        frameRate: 60,
        width: 1080,
        height: 1080,
        maxWidth: 1080,
        maxHeight: 1080,
      },
    });
    return stream;
  } catch (error) {
    console.error(error.message);
  }
}
