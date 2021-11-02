import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import { useIsDay } from '../hooks';
import Lottie from 'react-lottie';
import HOLIDAY from './holiday.json';

export const Holiday = () => {
    const isDay = useIsDay();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: HOLIDAY,
    };

    return (
        <Box display="flex" flexDir="column" alignItems="center" lineHeight="10em">
            <Text color="#9e2a2b" fontSize="6em" fontFamily="'Festive', cursive">It's Fall</Text>
            <Text color="#9e2a2b" fontSize="14em" fontFamily="'Festive', cursive">Y'all</Text>
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