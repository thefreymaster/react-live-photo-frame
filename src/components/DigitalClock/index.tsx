import { Box } from '@chakra-ui/layout';
import { Fade, Text } from '@chakra-ui/react';

import React from 'react';
import { useIsDay } from '../../hooks/index';

export const DigitalClock = (props: { fontSize?: string }) => {
    const isDay = useIsDay();
    let now = new Date();
    const [time, setTime] = React.useState(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    React.useLayoutEffect(() => {
        const getTime = () => {
            setTimeout(() => {
                setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                getTime();
            }, 1000);
        }
        getTime();
    }, [])
    return (
        <Fade in>
            <Box>
                <Text fontFamily="'Roboto Mono', monospace" fontSize={props.fontSize || "8em"} color={isDay ? 'black' : 'white'}>{time}</Text>
            </Box>
        </Fade>
    )
}