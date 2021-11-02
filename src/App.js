import './App.css';
import React from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { Routes } from './routes';
import { useIsDay } from './hooks/index';
import { GiRetroController } from 'react-icons/gi';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { io } from "socket.io-client";
import { Provider } from './providers';
import { IoIosRefresh } from 'react-icons/io';

const socket = io(`http://${process.env.REACT_APP_SERVER_IP}:4000`);

const App = () => {
  const isDay = useIsDay();
  const histroy = useHistory();
  const location = useLocation();
  const [device, setDevice] = React.useState(localStorage.getItem('device'));

  const getBackgroundColor = () => {
    if (location.pathname.includes('holiday')) {
      return '#fff3cb'
    }
    if (location.pathname.includes('weather')) {
      return isDay ? '#e2e2e2' : '#000'
    }
    return isDay ? '#fff' : '#000'
  }

  React.useEffect(() => {
    socket.on("change_view", (view) => {
      console.log(view)
      if (device === 'frame') {
        if (view === 'reload') {
          window.location.reload();
        }
        histroy.push(`/${view}`);
      }
    });
  }, []);

  return (
    <Provider socket={socket} device={device} setDevice={setDevice}>
      <Box
        height={window.innerHeight}
        width={window.innerWidth}
        display="flex"
        alignItems={isMobile ? "flex-start" : "center"}
        justifyContent='center'
        style={{
          backgroundColor: getBackgroundColor(),
          overflow: 'hidden',
        }}
        pt={isMobile && 8}
      >
        <Routes socket={socket} device={device} />
        {!location.pathname.includes('controller') && !location.pathname.includes('device') && <Link to="/controller">
          <IconButton colorScheme="gray" size="lg" icon={<GiRetroController />} style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            borderRadius: '5px 0px 0px',
            minHeight: 70,
            minWidth: 70
          }} />
        </Link>}
        <IconButton colorScheme="gray" size="lg" icon={<IoIosRefresh />} style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          borderRadius: '0px 5px 0px 0px',
          minHeight: 70,
          minWidth: 70,
        }}
          onClick={() => device === 'controller' ? socket.emit('change', 'refresh') : window.location.reload(true)}

        />
      </Box>
    </Provider>
  );
}

export default App;
