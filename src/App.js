import './App.css';
import { Box } from '@chakra-ui/react';

function App() {
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
