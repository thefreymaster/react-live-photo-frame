import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import { useIsDay } from '../hooks';
import { GiPumpkinMask } from 'react-icons/gi';
import Lottie from 'react-lottie';
import HALLOWEEN from './halloween.json';

export const Holiday = () => {
    const isDay = useIsDay();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: HALLOWEEN,
    };

    return (
        <Box display="flex" flexDir="column" alignItems="center" lineHeight="10em">
            <Text color="#ff7b00" fontSize="6em" fontFamily="'Festive', cursive">Happy</Text>
            <Text color="#ff7b00" fontSize="14em" fontFamily="'Festive', cursive">Halloween</Text>
            <Box mt="5em">
                <Lottie
                    options={defaultOptions}
                    height={400}
                    width={700}
                />
            </Box>
        </Box>
    )
}