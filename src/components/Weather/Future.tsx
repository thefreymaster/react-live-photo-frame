import { Box, Divider } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import CountUp from 'react-countup';
import { CgArrowLongDownC, CgArrowLongUpC } from 'react-icons/cg';
import { useIsDay } from '../../hooks';

const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const Future = (props: {
    index: number,
    forcast: {
        weather: Array<{
            icon: string
        }>
        temp: {
            day: number,
            min: number,
            max: number,
        },
        dt: number,
        sunrise: number,
    };
}) => {
    const getDayOfWeek = () => {
        if (today.getDay() + props.index > 6) {
            return daysOfTheWeek[0];
        }
        return daysOfTheWeek[today.getDay() + props.index]
    }
    const isDay = useIsDay();
    const today = new Date();
    const { temp } = props.forcast;
    const [current] = props.forcast.weather;
    return (
        <Box display="flex" flexDir="column" alignItems="center" padding="1em" margin="1em" borderRadius="1em">
            <img style={{ maxWidth: '6em' }} alt="weather icon" src={`https://openweathermap.org/img/wn/${current.icon}@4x.png`} />
            <Text letterSpacing="0px" fontFamily="'Anonymous Pro', monospace" fontWeight="300" fontSize="5em" color={isDay ? "black" : "white"}>
                <CountUp useEasing duration="5" start={temp.day - 10} end={temp.day} />°
            </Text>
            <Box display="flex" flexDir="row">
                <Text fontFamily="'Anonymous Pro', monospace" display="flex" flexDir="row" alignItems="center" justifyContent="center">
                    <CgArrowLongUpC />
                    {temp.max.toFixed(0)}°
                    <Divider orientation="vertical" marginLeft="1" />
                    <CgArrowLongDownC />
                    {temp.min.toFixed(0)}°
                </Text>
            </Box>
            <Text fontWeight="300" fontSize="2em" color={isDay ? "black" : "white"}>
                {getDayOfWeek()}
            </Text>
        </Box>
    )
}