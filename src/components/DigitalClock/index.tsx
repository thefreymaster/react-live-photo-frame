import { Box } from '@chakra-ui/layout';
import { Fade, Text } from '@chakra-ui/react';

import React from 'react';
import { useIsDay } from '../../hooks/index';

export const DigitalClock = () => {
    const isDay = useIsDay();
    let now = new Date();
    const [time, setTime] = React.useState(now.toLocaleTimeString());
    React.useLayoutEffect(() => {
        const getTime = () => {
            setTimeout(() => {
                setTime(new Date().toLocaleTimeString());
                getTime();
            }, 1000);
        }
        getTime();
    }, [])
    return (
        <Fade in>
            <Box>
                <Text fontFamily="'Roboto Mono', monospace" fontSize="8em" color={isDay ? 'black' : 'white'}>{time}</Text>
            </Box>
        </Fade>
    )
}