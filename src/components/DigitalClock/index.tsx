import { Box } from '@chakra-ui/layout';
import { Fade, Text } from '@chakra-ui/react';

import React from 'react';
import { useIsDay } from '../../hooks/index';
import { useHistory } from 'react-router-dom';

export const DigitalClock = (props: { fontSize?: string, hideTime?: boolean }) => {
    const history = useHistory();
    console.log(history)
    const isDay = useIsDay();
    let now = new Date();
    const [time, setTime] = React.useState(now.toLocaleTimeString());
    React.useLayoutEffect(() => {
        const getTime = () => {
            setTimeout(() => {
                if (new Date().toLocaleTimeString().includes(':00:00')) {
                    history.push(`/announcement${history.location.pathname}`)
                }
                else {
                    setTime(new Date().toLocaleTimeString());
                    getTime();
                }
            }, 1000);
        }
        getTime();
    }, []);

    if(props.hideTime){
        return <></>;
    }
    return (
        <Fade in>
            <Box>
                <Text fontFamily="'Roboto Mono', monospace" fontSize={props.fontSize || "8em"} color={isDay ? 'black' : 'white'}>{time}</Text>
            </Box>
        </Fade>
    )
}