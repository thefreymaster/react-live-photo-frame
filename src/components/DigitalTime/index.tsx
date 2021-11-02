import { Box } from '@chakra-ui/layout';
import React from 'react';

export const DigitalTime = (props: { hideSeconds?: boolean }) => {
    let now = new Date();
    let options = {};
    if(props.hideSeconds){
        options = { hour: '2-digit', minute: '2-digit' };
    }
    const [time, setTime] = React.useState(now.toLocaleTimeString('en-US', options));
    React.useLayoutEffect(() => {
        const getTime = () => {
            setTimeout(() => {
                setTime(new Date().toLocaleTimeString('en-US', options));
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