import './App.css';
import React from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { Routes } from './routes';
import { useIsDay } from './hooks/index';
import { CgController } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { io } from "socket.io-client";
import { Provider } from './providers';

const socket = io('http://localhost:4000');

const App = () => {
  const isDay = useIsDay();

  React.useEffect(() => {
    socket.on("change_view", (view) => {
      console.log(view);
    });
  }, []);

  return (
    <Provider value={socket}>
      <Box
        height={window.innerHeight}
        width={window.innerWidth}
        display="flex"
        alignItems={isMobile ? "flex-start" : "center"}
        justifyContent='center'
        style={{
          backgroundColor: isDay ? '#fff' : '#000'
        }}
        pt={isMobile && 8}
      >
        <Routes socket={socket} />
        <Link to="/controller">
          <IconButton colorScheme="red" icon={<CgController />} style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            borderRadius: '5px 0px 0px'
          }} />
        </Link>
      </Box>
    </Provider>
  );
}

export default App;
