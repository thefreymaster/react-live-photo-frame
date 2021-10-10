import { Button, Text } from '@chakra-ui/react';
import { Box, Divider } from '@chakra-ui/layout';
import { AiOutlineClockCircle, AiFillVideoCamera } from 'react-icons/ai';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { useIsDay } from '../../hooks/index';
import { changeView } from '../../api/index';

export const Controller = (props: { socket: any }) => {
    const isDay = useIsDay();
    return (
        <Box display="flex" flexDir="column" minW={300} >
            <Text color={isDay ? "black" : 'white'} fontSize="2xl">Controller</Text>
            <Text color={isDay ? "black" : 'white'} marginBottom={4} fontSize="xs">Change the view on the frame</Text>
            <Divider color="whiteAlpha.300" marginBottom={4} />
            <Button
                onClick={() => props.socket.emit('change', { view: 'clock'})}
                m={1}
                colorScheme="whiteAlpha"
                isFullWidth
                rightIcon={<AiOutlineClockCircle />}
            >Clock</Button>
            <Button onClick={() => props.socket.emit('change', { view: 'weather'})} m={1} colorScheme="whiteAlpha" isFullWidth rightIcon={<TiWeatherPartlySunny />}>Weather</Button>
            <Button onClick={() => props.socket.emit('change', { view: 'videos'})} m={1} colorScheme="whiteAlpha" isFullWidth rightIcon={<AiFillVideoCamera />}>Videos</Button>
        </Box>
    )
}