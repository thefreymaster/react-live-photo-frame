import './App.css';
import { Box } from '@chakra-ui/react';

function App() {
  window.addEventListener('load', function () {
    var newVideo = document.getElementById('videoPlayer');
    console.log(newVideo);
    newVideo.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false);
    newVideo.play();
  });

  return (
    <Box height={window.innerHeight} width={window.innerWidth}>
      <video id="videoPlayer" autoPlay controls={false} width="100%" loop muted playsInline>
        <source src="/videos/troy.MOV" type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>
    </Box>
  );
}

export default App;
