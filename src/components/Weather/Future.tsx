import { Box } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import { useIsDay } from '../../hooks';

export const Future = (props: {
    forcast: {
        main: any;
        weather: any;
        dt_txt: string;
    };
}) => {
    const isDay = useIsDay();
    const now = new Date();
    const forcastTime = new Date(props.forcast.dt_txt);
    const forcastIn = Math.abs(now.getTime() - forcastTime.getTime());
    const { main } = props.forcast;
    const [current] = props.forcast.weather;

    return (
        <Box display="flex" flexDir="column" alignItems="center" padding="2em" margin="2em" borderRadius="1em">
            <img style={{ maxWidth: '6.25em' }} alt="weather icon" src={`https://openweathermap.org/img/wn/${current.icon}@4x.png`} />
            <Text fontWeight="300" fontSize="5em" color={isDay ? "black" : "white"}>
                {main.temp.toFixed(0)}
            </Text>
            <Text fontWeight="300" fontSize="2em" color={isDay ? "black" : "white"}>
                in {(forcastIn/3600000).toFixed(0)} hours
            </Text>
        </Box>
    )
}