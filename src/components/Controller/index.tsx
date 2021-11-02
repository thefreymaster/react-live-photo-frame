import React from 'react';
import { IconButton, Text, ScaleFade, useDisclosure, Button, Spinner } from '@chakra-ui/react';
import { Box, Divider } from '@chakra-ui/layout';
import { AiOutlineClockCircle, AiFillVideoCamera } from 'react-icons/ai';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { FaDigitalTachograph } from 'react-icons/fa';

import { useIsDay } from '../../hooks/index';
import { useGlobalState } from '../../providers/index';
import { useHistory, Redirect } from 'react-router-dom';
import { getVideosList } from '../../api';
import { useQuery } from 'react-query';
import { GiOakLeaf } from 'react-icons/gi';

const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).replace('.mp4', '');
}

export const Controller = (props: { socket: any }) => {
    const { isLoading, data }: any = useQuery('videos', () => getVideosList());

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
        return <Redirect to="/device" />
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <ScaleFade initialScale={0.9} in={isOpen}>
            <Box display="flex" flexDir="column" minW={300} >
                <Text color={isDay ? "black" : 'white'} fontSize="2xl" fontWeight="900">Controller</Text>
                <Text color={isDay ? "black" : 'white'} marginBottom={4} fontSize="xs">Change the view on the frame</Text>
                <Divider color="whiteAlpha.300" marginBottom={4} />
                <Box flexDir="row" flexWrap="wrap" display="flex" justifyContent="flex-start">
                    <Button
                        aria-label="clock"
                        maxW="30%"
                        minH="90px"
                        fontSize="4xl"
                        onClick={() => global.device === 'controller' ? props.socket.emit('change', 'clock') : handleIsOpen('/clock')}
                        m={1} colorScheme="gray" isFullWidth
                    >
                        <Box display="flex" flexDir="column" alignItems="center" justifyContent="center">
                            <AiOutlineClockCircle />
                            <Text fontSize="xs" mt="1">Analog</Text>
                        </Box>
                    </Button>
                    <Button
                        aria-label="clock"
                        maxW="30%"
                        minH="90px"
                        fontSize="4xl"
                        onClick={() => global.device === 'controller' ? props.socket.emit('change', 'weather') : handleIsOpen('/weather')}
                        m={1} colorScheme="gray" isFullWidth
                    >
                        <Box display="flex" flexDir="column" alignItems="center" justifyContent="center">
                            <TiWeatherPartlySunny />
                            <Text fontSize="xs" mt="1">Weather</Text>
                        </Box>
                    </Button>
                    <Button
                        aria-label="clock"
                        maxW="30%"
                        minH="90px"
                        fontSize="4xl"
                        onClick={() => global.device === 'controller' ? props.socket.emit('change', 'digital-clock') : handleIsOpen('/digital-clock')}
                        m={1} colorScheme="gray" isFullWidth
                    >
                        <Box display="flex" flexDir="column" alignItems="center" justifyContent="center">
                            <FaDigitalTachograph />
                            <Text fontSize="xs" mt="1">Digital</Text>
                        </Box>
                    </Button>
                    <Button
                        aria-label="clock"
                        maxW="30%"
                        minH="90px"
                        fontSize="4xl"
                        onClick={() => global.device === 'controller' ? props.socket.emit('change', 'holiday') : handleIsOpen('/holiday')}
                        m={1} colorScheme="gray" isFullWidth
                    >
                        <Box display="flex" flexDir="column" alignItems="center" justifyContent="center">
                            <GiOakLeaf />
                            <Text fontSize="xs" mt="1">Holiday</Text>
                        </Box>
                    </Button>
                </Box>
                <Divider color="whiteAlpha.300" marginBottom={4} mt={4} />
                <Box flexDir="row" flexWrap="wrap" display="flex" justifyContent="flex-start">
                    {data.map((item: any) => (
                        <Button
                            aria-label="clock"
                            maxW="30%"
                            minH="90px"
                            fontSize="4xl"
                            onClick={() => global.device === 'controller' ? props.socket.emit('change', `videos/${item.replace('.mp4', '')}`) : handleIsOpen(`videos/${item.replace('.mp4', '')}`)}
                            m={1} colorScheme="gray" isFullWidth
                        >
                            <Box display="flex" flexDir="column" alignItems="center" justifyContent="center">
                                <AiFillVideoCamera />
                                <Text fontSize="small">{capitalizeFirstLetter(item)}</Text>
                            </Box>
                        </Button>
                    ))}
                </Box>
            </Box>
        </ScaleFade>
    )
}