import React from 'react';
import { IconButton, Text, ScaleFade, useDisclosure } from '@chakra-ui/react';
import { Box, Divider } from '@chakra-ui/layout';
import { AiOutlineClockCircle, AiFillVideoCamera } from 'react-icons/ai';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { useIsDay } from '../../hooks/index';
import { useGlobalState } from '../../providers/index';
import { useHistory, Redirect } from 'react-router-dom';

export const Controller = (props: { socket: any }) => {
    const isDay = useIsDay();
    const global = useGlobalState();
    const history = useHistory();

    const { isOpen, onToggle } = useDisclosure();

    const handleIsOpen = (route: string) => {
        onToggle();
        setTimeout(() => {
            history.push(route);
        }, 500);
    }

    React.useLayoutEffect(() => {
        onToggle();
    }, [])

    if (global.device === null) {
        debugger
        return <Redirect to="/device" />
    }

    return (
        <ScaleFade initialScale={0.9} in={isOpen}>
            <Box display="flex" flexDir="column" minW={300} >
                <Text color={isDay ? "black" : 'white'} fontSize="2xl" fontWeight="900">Controller</Text>
                <Text color={isDay ? "black" : 'white'} marginBottom={4} fontSize="xs">Change the view on the frame</Text>
                <Divider color="whiteAlpha.300" marginBottom={4} />
                <Box flexDir="row" flexWrap="wrap" display="flex" justifyContent="center">
                    <IconButton
                        aria-label="clock"
                        maxW="30%"
                        minH="90px"
                        fontSize="4xl"
                        onClick={() => global.device === 'controller' ? props.socket.emit('change', 'clock') : handleIsOpen('/clock')}
                        m={1}
                        colorScheme="red"
                        isFullWidth
                        icon={<AiOutlineClockCircle />}
                    />
                    <IconButton
                        aria-label="clock"
                        maxW="30%"
                        minH="90px"
                        fontSize="4xl"
                        onClick={() => global.device === 'controller' ? props.socket.emit('change', 'weather') : handleIsOpen('/weather')}
                        m={1} colorScheme="red" isFullWidth icon={<TiWeatherPartlySunny />}
                    />
                    <IconButton
                        aria-label="clock"
                        maxW="30%"
                        minH="90px"
                        fontSize="4xl"
                        onClick={() => global.device === 'controller' ? props.socket.emit('change', 'videos') : handleIsOpen('/videos')}
                        m={1} colorScheme="red" isFullWidth icon={<AiFillVideoCamera />}
                    />
                </Box>
            </Box>
        </ScaleFade>
    )
}