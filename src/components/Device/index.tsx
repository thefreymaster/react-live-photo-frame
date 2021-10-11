import { Box, IconButton, Text } from '@chakra-ui/react';
import { AiOutlinePicture } from 'react-icons/ai';
import { GiRetroController } from 'react-icons/gi';
import { useHistory } from 'react-router-dom';
import { useGlobalState } from '../../providers/index';
import { useIsDay } from '../../hooks/index';
import { Divider } from '@chakra-ui/layout';

export const Device = () => {
    const { device, setDevice } = useGlobalState();
    const history = useHistory();
    const isDay = useIsDay();

    return (
        <Box color="white" flexWrap="wrap" display="flex" minW={300} flexDir="column">
            <Text color={isDay ? "black" : 'white'} fontSize="2xl" fontWeight="900">Device</Text>
            <Text color={isDay ? "black" : 'white'} marginBottom={4} fontSize="xs">Choose if this is the frame or the controller</Text>
            <Divider color="whiteAlpha.300" marginBottom={4} />
            <IconButton
                onClick={() => {
                    setDevice('frame')
                    localStorage.setItem('device', 'frame');
                    history.push('/controller');
                }}
                fontSize="6xl" colorScheme="red" aria-label="frame" minW="47%" minH="240px" m={1} icon={<AiOutlinePicture />}
            />
            <IconButton
                onClick={() => {
                    setDevice('controller')
                    localStorage.setItem('device', 'controller');
                    history.push('/controller');
                }}
                fontSize="6xl" colorScheme="red" aria-label="controller" minW="47%" minH="240px" m={1} icon={<GiRetroController />}
            />
        </Box>
    )
}