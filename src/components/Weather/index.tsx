import { ScaleFade, Text, useDisclosure } from '@chakra-ui/react';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import axios from 'axios';

export const Weather = () => {
    const { isOpen } = useDisclosure();

    const [weather, setWeather] = React.useState({
        main: {
            temp: 0,
            humidity: 0,
        },
        name: '',
        wind: {
            speed: 0,
            deg: 0,
        }
    });
    const [loading, setloading] = React.useState(true);

    React.useLayoutEffect(() => {
        setloading(true)
        const getWeather = async () => {
            const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${process.env.REACT_APP_LOCATION}&appid=${process.env.REACT_APP_OPENWEATHERMAP}&units=imperial`)
            console.log(result.data)
            setWeather(result.data);
            setloading(false);
            setTimeout(() => {
                setloading(true);
                getWeather();
            }, 300000);
        }
        getWeather();
    }, [])

    if (loading) {
        return <>"Loading"</>
    }
    return (
        <ScaleFade initialScale={0.9} in>
            <Box display="flex" flexDir="column">
                <Box p={10} display="flex" justifyContent='center' alignItems='center'>
                    <Text lineHeight="150px" fontWeight="100" fontSize="300px" color="white">{weather.main.temp.toFixed(0)}</Text>
                </Box>
                <Box p={10} display="flex" justifyContent='center' alignItems='center'>
                    <Text lineHeight="40px" fontWeight="100" fontSize="70px" color="white">{weather.name}</Text>
                </Box>
                <Box p={10} display="flex" justifyContent='center' alignItems='flex-start' flexDir="row">
                    <Box p={10} display="flex" justifyContent='center' alignItems='flex-start' flexDir="column">
                        <Text lineHeight="60px" fontWeight="100" fontSize="100px" color="white">{weather.main.humidity.toFixed(0)}%</Text>
                        <Text fontWeight="100" fontSize="40px" color="white">HUMIDITY</Text>
                    </Box>
                    <Box p={10} display="flex" justifyContent='center' alignItems='flex-start' flexDir="column">
                        <Box display="flex" flexDir="row">
                            <Text lineHeight="60px" fontWeight="100" fontSize="100px" color="white">{weather.wind.speed}mph</Text>
                            <BsFillArrowUpCircleFill color="#fff" fontSize="72px" style={{ marginLeft: 20, transform: `rotate(${weather.wind.deg}deg)`, transition: 'transform 1250ms ease-in-out' }} />
                        </Box>
                        <Text fontWeight="100" fontSize="40px" color="white">WIND</Text>
                    </Box>
                </Box>

            </Box>
        </ScaleFade>
    );
}