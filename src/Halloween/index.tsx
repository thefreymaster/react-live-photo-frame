import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import { useIsDay } from '../hooks';

export const Halloween = () => {
    const isDay = useIsDay();
    console.log(isDay)
    return (
        <Box display="flex" flexDir="column" alignItems='center' lineHeight="8em">
            <Text color="#ff7b00" fontSize="4em" fontFamily="'Festive', cursive">Happy</Text>
            <Text color="#ff7b00" fontSize="10em" fontFamily="'Festive', cursive">Halloween</Text>
        </Box>
    )
}