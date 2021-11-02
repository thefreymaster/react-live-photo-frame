import { Box } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';

import { ScaleFade } from '@chakra-ui/transition';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { DEFAULT_MONO_FONT } from '../../constants';
import { useIsDay } from '../../hooks/index';
import { DigitalTime } from '../DigitalTime';

export const Announcement = () => {
    const isDay = useIsDay();
    const history = useHistory();
    const { previous }: { previous: string } = useParams();

    React.useLayoutEffect(() => {
        setTimeout(() => {
            history.push(`/${previous}`)
        }, 60000);
    }, []);
    
    return (
        <ScaleFade initialScale={0.9} in>
            <Box display="flex" flexDir="column">
                <Text
                    fontFamily={DEFAULT_MONO_FONT} fontWeight="100" fontSize="4em"
                    color={isDay ? "black" : "white"}>
                    It is:
                </Text>
                <Text
                    letterSpacing="-10px"
                    fontFamily={DEFAULT_MONO_FONT} fontWeight="100" fontSize="10em"
                    color={isDay ? "black" : "white"}>
                    <DigitalTime hideSeconds />
                </Text>
            </Box>
        </ScaleFade>
    )
}