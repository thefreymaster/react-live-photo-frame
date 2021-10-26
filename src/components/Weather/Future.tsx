import { Box } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import CountUp from 'react-countup';
import { useIsDay } from '../../hooks';

const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const Future = (props: {
    forcast: {
        main: any;
        weather: any;
        dt_txt: string;
    };
}) => {
    const isDay = useIsDay();
    const forcastTime = new Date(props.forcast.dt_txt);
    const { main } = props.forcast;
    const [current] = props.forcast.weather;
    return (
        <Box display="flex" flexDir="column" alignItems="center" padding="1em" margin="1em" borderRadius="1em">
            <img style={{ maxWidth: '6em' }} alt="weather icon" src={`https://openweathermap.org/img/wn/${current.icon}@4x.png`} />
            <Text letterSpacing="0px" fontFamily="'Anonymous Pro', monospace" fontWeight="300" fontSize="5em" color={isDay ? "black" : "white"}>
                <CountUp useEasing duration="5" start={main.temp - 10} end={main.temp} />°
            </Text>
            <Text fontWeight="300" fontSize="2em" color={isDay ? "black" : "white"}>
                {daysOfTheWeek[forcastTime.getDay()]}
            </Text>
        </Box>
    )
}