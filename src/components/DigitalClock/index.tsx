import { Box } from '@chakra-ui/layout';
import { Fade, Text } from '@chakra-ui/react';

import React from 'react';

export const DigitalClock = () => {
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
                <Text fontSize="8em">{time}</Text>
            </Box>
        </Fade>
    )
}