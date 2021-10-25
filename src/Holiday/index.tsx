import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import { useIsDay } from '../hooks';
import { GiPumpkinMask } from 'react-icons/gi';

export const Holiday = () => {
    const isDay = useIsDay();
    console.log(isDay)
    return (
        <Box display="flex" flexDir="column" alignItems="center" lineHeight="10em">
            <Text color="#ff7b00" fontSize="6em" fontFamily="'Festive', cursive">Happy</Text>
            <Text color="#ff7b00" fontSize="14em" fontFamily="'Festive', cursive">Halloween</Text>
            <Box mt="5em">
                <GiPumpkinMask color="#9500f6" size="20em" />
            </Box>
        </Box>
    )
}