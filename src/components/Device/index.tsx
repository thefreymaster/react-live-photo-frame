import { Box, Button, ScaleFade, Text } from '@chakra-ui/react';
import { AiOutlinePicture } from 'react-icons/ai';
import { GiRetroController } from 'react-icons/gi';
import { useHistory } from 'react-router-dom';
import { useGlobalState } from '../../providers/index';
import { useIsDay } from '../../hooks/index';
import { Divider } from '@chakra-ui/layout';

export const Device = () => {
    const { setDevice } = useGlobalState();
    const history = useHistory();
    const isDay = useIsDay();

    return (
        <ScaleFade initialScale={0.9} in>
            <Box color="white" flexWrap="wrap" display="flex" minW={300} flexDir="column">
                <Text color={isDay ? "black" : 'white'} fontSize="2xl" fontWeight="900">Device</Text>
                <Text color={isDay ? "black" : 'white'} marginBottom={4} fontSize="xs">Choose if this is the frame or the controller</Text>
                <Divider color="whiteAlpha.300" marginBottom={4} />
                <Button
                    aria-label="clock"
                    minH="150px"
                    fontSize="4xl"
                    onClick={() => {
                        setDevice('frame')
                        localStorage.setItem('device', 'frame');
                        history.push('/controller');
                    }} m={1} colorScheme="gray" isFullWidth
                >
                    <Box display="flex" flexDir="column" alignItems="center" justifyContent="center">
                        <AiOutlinePicture color={isDay ? "black" : "white"} />
                        <Text color={isDay ? "black" : "white"} fontSize="small">Frame</Text>
                    </Box>
                </Button>
                <Button
                    aria-label="clock"
                    minH="150px"
                    fontSize="4xl"
                    onClick={() => {
                        setDevice('controller')
                        localStorage.setItem('device', 'controller');
                        history.push('/controller');
                    }} m={1} colorScheme="gray" isFullWidth
                >
                    <Box display="flex" flexDir="column" alignItems="center" justifyContent="center">
                        <GiRetroController color={isDay ? "black" : "white"} />
                        <Text color={isDay ? "black" : "white"} fontSize="small">Controller</Text>
                    </Box>
                </Button>
                {/* <IconButton
                onClick={() => {
                    setDevice('frame')
                    localStorage.setItem('device', 'frame');
                    history.push('/controller');
                }}
                fontSize="6xl" isFullWidth colorScheme="gray" aria-label="frame" minW="47%" minH="200px" m={1} icon={<AiOutlinePicture color={isDay ? "black" : "white"} />}
            /> */}
                {/* <IconButton
                onClick={() => {
                    setDevice('controller')
                    localStorage.setItem('device', 'controller');
                    history.push('/controller');
                }}
                fontSize="6xl" colorScheme="gray"
                isFullWidth aria-label="controller" minW="47%" minH="240px" m={1} icon={<GiRetroController color={isDay ? "black" : "white"} />}
            /> */}
            </Box>
        </ScaleFade>
    )
}