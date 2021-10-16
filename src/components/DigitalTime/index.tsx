import { Box } from '@chakra-ui/layout';
import React from 'react';

export const DigitalTime = () => {
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
        <Box>
            {time}
        </Box>
    )
}