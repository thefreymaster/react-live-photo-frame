/* eslint-disable array-callback-return */
import { ScaleFade, Spinner, Text } from '@chakra-ui/react';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { Box, Divider } from '@chakra-ui/layout';
import React from 'react';
import axios from 'axios';
import { useIsDay } from '../../hooks/index';
import { Future } from './Future';
import CountUp from 'react-countup';
import { DigitalClock } from '../DigitalClock';

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
    const [previousTemp, setPreviousTemp]: any = React.useState();

    React.useLayoutEffect(() => {
        const getForcast = async (lat: number, long: number) => {
            const fcast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${process.env.REACT_APP_LOCATION}&appid=${process.env.REACT_APP_OPENWEATHERMAP}&units=imperial`);
            setForcast(fcast.data);
            setloading(false);
        }
        const getWeather = async () => {
            const result: any = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${process.env.REACT_APP_LOCATION}&appid=${process.env.REACT_APP_OPENWEATHERMAP}&units=imperial`)
            getForcast(result.data.coord.lat, result.data!.coord.lon);
            setWeather(result.data);
            setPreviousTemp(weather.main.temp);
        }
        getWeather();
    }, []);

    React.useLayoutEffect(() => {
        const getForcast = async (lat: number, long: number) => {
            const fcast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${process.env.REACT_APP_LOCATION}&appid=${process.env.REACT_APP_OPENWEATHERMAP}&units=imperial`);
            setForcast(fcast.data);
            console.log(fcast.data);
        }
        const getWeather = async () => {
            const result: any = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${process.env.REACT_APP_LOCATION}&appid=${process.env.REACT_APP_OPENWEATHERMAP}&units=imperial`)
            console.log(result.data);
            getForcast(result.data.coord.lat, result.data!.coord.lon);
            setWeather(result.data);
            setTimeout(() => {
                getWeather();
            }, 60000);
        }
        getWeather();
    }, []);
    const today = new Date();
    const [current] = weather.weather;

    const fiveDayForcast: any = [];
    forcast.list.map((item: any) => {
        if (item.dt_txt.includes("15:00:00")) {
            fiveDayForcast.push(item)
        }
    }, [])

    if (loading) {
        return <><Spinner size="xl" /></>
    }
    return (
        <ScaleFade initialScale={0.9} in>
            <Box display="flex" flexDir="column">
                <Box display="flex" flexDir="row" alignItems="center">
                    <Box display="flex" flexDir="column">
                        <Box pl={2} display="flex" justifyContent='flex-start' alignItems='flex-start'>
                            <DigitalClock fontSize="5em" />
                        </Box>
                        <Divider marginBottom="10" mt={16} mb={16} opacity={isDay ? 0.6 : 0.5} />
                        <Box p={2} display="flex" justifyContent='flex-start' alignItems='flex-start'>
                            <Text lineHeight="40px" fontWeight="400" fontSize="6em" color={isDay ? "black" : "white"}>{weather.name}</Text>
                        </Box>
                        <Box p={2} display="flex" justifyContent='flex-start' alignItems='flex-start'>
                            <Text lineHeight="50px" fontWeight="300" fontSize="2.5em" color={isDay ? "black" : "white"}>{today.toDateString()}</Text>
                        </Box>
                    </Box>
                    <Box flexGrow={1} />
                    <Divider orientation="vertical" mt={16} mb={16} opacity={isDay ? 0.6 : 0.5} />
                    <Box flexGrow={1} />
                    <Box>
                        <Box display="flex" justifyContent='flex-start' alignItems='flex-start'>
                            <img alt="weather icon" src={`https://openweathermap.org/img/wn/${current.icon}@4x.png`} />
                        </Box>
                    </Box>
                </Box>
                <Divider mt={5} mb={5} opacity={isDay ? 0.6 : 0.5} />
                <Box display="flex" flexDir="row">
                    <Box pt={5} display="flex" justifyContent='flex-start' alignItems='flex-start' flexDir='column'>
                        <Text letterSpacing="-10px" fontFamily="'Anonymous Pro', monospace" lineHeight="0.9em" fontWeight="100" fontSize="14em" color={isDay ? "black" : "white"}>
                            <CountUp useEasing duration="6" start={previousTemp || weather.main.temp - 10} end={weather.main.temp} />°
                        </Text>
                        <Text fontWeight="100" fontSize="2em" color={isDay ? "black" : "white"}>{current.description}</Text>
                    </Box>
                    <Box flexGrow={1} />
                    <Divider orientation="vertical" />
                    <Box display="flex" flexDir="column">
                        <Box display="flex" justifyContent='flex-end' alignItems='center' flexDir='column'>
                            <Text fontFamily="'Anonymous Pro', monospace" lineHeight="60px" fontWeight="400" fontSize="3em" color={isDay ? "black" : "white"}>{weather.main.humidity}%</Text>
                            <Text fontWeight="100" fontSize="2em" color={isDay ? "black" : "white"}>Humidity</Text>
                        </Box>
                        <Box flexGrow={1} />
                        <Divider mt={2} mb={2} />
                        <Box flexGrow={1} />
                        <Box display="flex" justifyContent='flex-end' alignItems='center' flexDir='column'>
                            <Text fontFamily="'Anonymous Pro', monospace" lineHeight="60px" fontWeight="400" fontSize="3em" color={isDay ? "black" : "white"}>{weather.main.feels_like.toFixed(0)}°</Text>
                            <Text fontWeight="100" fontSize="2em" color={isDay ? "black" : "white"}>Feels Like</Text>
                        </Box>
                    </Box>
                    <Box flexGrow={1} />
                    <Box display="flex" justifyContent='center' alignItems='center' flexDir='column'>
                        <BsFillArrowUpCircleFill color={isDay ? "black" : "white"} fontSize="72px" style={{ transform: `rotate(${weather.wind.deg}deg)`, transition: 'transform 1250ms ease-in-out' }} />
                        <Text lineHeight="60px" fontWeight="200" fontSize="3em" color={isDay ? "black" : "white"}>{weather.wind.speed}mph</Text>
                        <Text fontWeight="100" fontSize="2em" color={isDay ? "black" : "white"}>Wind</Text>
                    </Box>
                    <Box flexGrow={1} />

                </Box>
                <Divider mt={12} mb={16} opacity={isDay ? 0.6 : 0.5} />
                <Box display="flex" justifyContent='flex-start' alignItems='flex-start' flexDir='row' width="100%">
                    {fiveDayForcast.map((item: any, index: any) => {
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
            </Box>
        </ScaleFade>
    );
}