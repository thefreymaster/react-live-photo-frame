import { ScaleFade, Spinner, Text } from '@chakra-ui/react';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { Box, Divider } from '@chakra-ui/layout';
import React from 'react';
import axios from 'axios';
import { useIsDay } from '../../hooks/index';
import { Future } from './Future';
import { DigitalTime } from '../DigitalTime';

export const Weather = () => {
    const isDay = useIsDay();

    const [weather, setWeather] = React.useState({
        main: {
            temp: 0,
            humidity: 0,
            feels_like: 0,
        },
        name: '',
        wind: {
            speed: 0,
            deg: 0,
        },
        weather: [{
            icon: '',
            description: '',
            main: '',
        }],
    });
    const [forcast, setForcast] = React.useState({
        list: []
    });

    const [loading, setloading] = React.useState(true);

    React.useLayoutEffect(() => {
        const getForcast = async () => {
            const fcast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${process.env.REACT_APP_LOCATION}&appid=${process.env.REACT_APP_OPENWEATHERMAP}&units=imperial`);
            setForcast(fcast.data);
            setloading(false);
            console.log(fcast.data);
        }
        const getWeather = async () => {
            const result: any = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${process.env.REACT_APP_LOCATION}&appid=${process.env.REACT_APP_OPENWEATHERMAP}&units=imperial`)
            console.log(result.data);
            getForcast();
            setWeather(result.data);
            setTimeout(() => {
                setloading(true);
                getWeather();
            }, 60000);
        }
        getWeather();
    }, []);
    const today = new Date();
    const [current] = weather.weather;

    if (loading) {
        return <><Spinner size="xl" /></>
    }
    return (
        <ScaleFade initialScale={0.9} in>
            <Box display="flex" flexDir="column">
                <Box display="flex" flexDir="row" alignItems="center">
                    <Box display="flex" flexDir="column">
                        <Box p={2} display="flex" justifyContent='flex-start' alignItems='flex-start'>
                            <Text lineHeight="40px" fontWeight="400" fontSize="4em" color={isDay ? "black" : "white"}>{weather.name}</Text>
                        </Box>
                        <Box p={2} display="flex" justifyContent='flex-start' alignItems='flex-start'>
                            <Text lineHeight="40px" fontWeight="300" fontSize="2em" color={isDay ? "black" : "white"}>{today.toDateString()}</Text>
                        </Box>
                        <Box pl={2} display="flex" justifyContent='flex-start' alignItems='flex-start'>
                            <Text lineHeight="30px" fontWeight="400" fontSize="1.5em" color={isDay ? "black" : "white"}>
                                <DigitalTime />
                            </Text>
                        </Box>

                    </Box>
                    <Box flexGrow={1} />
                    <Divider orientation="vertical" />
                    <Box flexGrow={1} />
                    <Box>
                        <Box display="flex" justifyContent='flex-start' alignItems='flex-start'>
                            <img alt="weather icon" src={`https://openweathermap.org/img/wn/${current.icon}@4x.png`} />
                        </Box>
                    </Box>
                </Box>
                <Divider mt={5} mb={5} opacity={isDay ? 0.5 : 0.1} />
                <Box display="flex" flexDir="row">
                    <Box pt={5} display="flex" justifyContent='flex-start' alignItems='flex-start' flexDir='column'>
                        <Text lineHeight="0.9em" fontWeight="100" fontSize="14em" color={isDay ? "black" : "white"}>{weather.main.temp.toFixed(0)}°</Text>
                        <Text fontWeight="100" fontSize="2em" color={isDay ? "black" : "white"}>{current.main}, {current.description}</Text>
                    </Box>
                    <Box flexGrow={1} />
                    <Divider orientation="vertical" />
                    <Box display="flex" flexDir="column">
                        <Box display="flex" justifyContent='flex-end' alignItems='center' flexDir='column'>
                            <Text lineHeight="60px" fontWeight="400" fontSize="3em" color={isDay ? "black" : "white"}>{weather.main.humidity}%</Text>
                            <Text fontWeight="100" fontSize="2em" color={isDay ? "black" : "white"}>Humidity</Text>
                        </Box>
                        <Box flexGrow={1} />
                        <Divider mt={2} mb={2} />
                        <Box flexGrow={1} />
                        <Box display="flex" justifyContent='flex-end' alignItems='center' flexDir='column'>
                            <Text lineHeight="60px" fontWeight="400" fontSize="3em" color={isDay ? "black" : "white"}>{weather.main.feels_like.toFixed(0)}°</Text>
                            <Text fontWeight="100" fontSize="2em" color={isDay ? "black" : "white"}>Feels Like</Text>
                        </Box>
                    </Box>
                    <Box flexGrow={1} />
                    <Box display="flex" justifyContent='flex-end' alignItems='center' flexDir='column'>
                        <BsFillArrowUpCircleFill color={isDay ? "black" : "white"} fontSize="72px" style={{ transform: `rotate(${weather.wind.deg}deg)`, transition: 'transform 1250ms ease-in-out' }} />
                        <Text lineHeight="60px" fontWeight="200" fontSize="3em" color={isDay ? "black" : "white"}>{weather.wind.speed}mph</Text>
                        <Text fontWeight="100" fontSize="2em" color={isDay ? "black" : "white"}>Wind Direction</Text>
                    </Box>
                    <Box flexGrow={1} />

                </Box>
                <Divider mt={12} opacity={isDay ? 0.5 : 0.1} />
                <Box display="flex" justifyContent='flex-start' alignItems='flex-start' flexDir='row' width="100%">
                    {forcast.list.map((item, index) => {
                        if (index < 4) {
                            return (
                                <>
                                    <Box flexGrow={1} />
                                    <Future forcast={item} />
                                    <Box flexGrow={1} />
                                </>
                            )
                        }
                        return null
                    })}
                </Box>
                {/* <Box p={10} display="flex" justifyContent='flex-start' alignItems='center'>
                    <Text lineHeight="150px" fontWeight="100" fontSize="200px" color={isDay ? "black" : "white"}>{weather.main.temp.toFixed(0)}°</Text>
                </Box>
                <Box p={10} display="flex" justifyContent='flex-start' alignItems='center'>
                    <Text lineHeight="40px" fontWeight="100" fontSize="70px" color={isDay ? "black" : "white"}>{weather.name}</Text>
                </Box>
                <Box p={10} display="flex" justifyContent='center' alignItems='flex-start' flexDir="row">
                    <Box p={10} display="flex" justifyContent='center' alignItems='flex-start' flexDir="column">
                        <Text lineHeight="60px" fontWeight="100" fontSize="100px" color={isDay ? "black" : "white"}>{weather.main.humidity.toFixed(0)}%</Text>
                        <Text fontWeight="100" fontSize="40px" color={isDay ? "black" : "white"}>HUMIDITY</Text>
                    </Box>
                    <Box p={10} display="flex" justifyContent='center' alignItems='flex-start' flexDir="column">
                        <Box display="flex" flexDir="row">
                            <Text lineHeight="60px" fontWeight="100" fontSize="100px" color={isDay ? "black" : "white"}>{weather.wind.speed}mph</Text> */}
                {/* </Box>
                        <Text fontWeight="100" fontSize="40px" color={isDay ? "black" : "white"}>WIND</Text>
                    </Box>
                </Box> */}

            </Box>
        </ScaleFade>
    );
}