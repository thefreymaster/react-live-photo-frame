/* eslint-disable array-callback-return */
import { ScaleFade, Spinner, Tag, Text } from "@chakra-ui/react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { Box, Divider } from "@chakra-ui/layout";
import React from "react";
import axios from "axios";
import { useIsDay } from "../../hooks/index";
import { Future } from "./Future";
import { DigitalClock } from "../DigitalClock";
import { DEFAULT_MONO_FONT } from "../../constants";
import { FaTemperatureHigh } from "react-icons/fa";
import { CgArrowLongDownC, CgArrowLongUpC } from "react-icons/cg";

export const Weather = () => {
  const isDay = useIsDay();

  const [weather, setWeather] = React.useState({
    current: {
      name: "",
      wind: {
        speed: 0,
        deg: 0,
      },
      weather: [
        {
          icon: "",
          description: "",
          main: "",
        },
      ],
      temp: 0,
      humidity: 0,
      feels_like: 0,
      wind_deg: 0,
      wind_speed: 0,
      wind_gust: 0,
      daily: [],
    },
    daily: [],
    city: "",
    loading: true,
  });

  React.useLayoutEffect(() => {
    const getWeather = async () => {
      const { data: weather }: any = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${process.env.REACT_APP_LAT}&lon=${process.env.REACT_APP_LONG}&exclude=minutely,hourly&appid=${process.env.REACT_APP_OPENWEATHERMAP}&units=imperial`
      );
      setWeather({
        ...weather,
        city: process.env.REACT_APP_CITY,
        loading: false,
      });
    };
    getWeather();
  }, []);

  React.useLayoutEffect(() => {
    const getWeather = async () => {
      const { data: weather }: any = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${process.env.REACT_APP_LAT}&lon=${process.env.REACT_APP_LONG}&exclude=minutely,hourly&appid=${process.env.REACT_APP_OPENWEATHERMAP}&units=imperial`
      );
      setWeather({
        ...weather,
        city: process.env.REACT_APP_CITY,
        loading: false,
      });
      setTimeout(() => {
        getWeather();
      }, 1800000);
    };
    setTimeout(() => {
      getWeather();
    }, 1800000);
  }, []);

  const today = new Date();
  const [liveWeather]: any = weather.current.weather;
  const { daily, alerts }: any = weather;
  const [todaysWeather]: any = daily;
  console.log(todaysWeather);

  if (weather.loading) {
    return (
      <>
        <Spinner size="xl" />
      </>
    );
  }
  return (
    <ScaleFade initialScale={0.9} in>
      <Box display="flex" flexDir="column" padding="70px">
        <Box display="flex" flexDir="row" alignItems="center">
          <Box display="flex" flexDir="column">
            <Box
              pl={2}
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <DigitalClock fontSize="2em" />
            </Box>
            <Divider
              marginBottom="10"
              mt={8}
              mb={8}
              opacity={isDay ? 0.6 : 0.5}
            />
            <Box
              p={2}
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Text
                lineHeight="40px"
                fontWeight="400"
                fontSize="5em"
                color={isDay ? "black" : "white"}
              >
                {weather.city}
              </Text>
            </Box>
            <Box
              p={2}
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Text
                lineHeight="50px"
                fontWeight="300"
                fontSize="2em"
                color={isDay ? "black" : "white"}
              >
                {today.toDateString()}
              </Text>
            </Box>
          </Box>
          <Box flexGrow={1} />
          <Box display="flex" justifyContent="center" alignItems="center">
            <img
              alt="weather icon"
              src={`https://openweathermap.org/img/wn/${liveWeather.icon}@4x.png`}
            />
          </Box>
          <Box flexGrow={1} />
        </Box>
        <Divider mt={5} mb={5} opacity={isDay ? 0.6 : 0.5} />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDir="row"
          pb="4"
        >
          {alerts &&
            alerts.map((alert: any) => (
              <Box mr="1">
                <Tag>{alert.event}</Tag>
              </Box>
            ))}
        </Box>
        <Box display="flex" flexDir="row">
          <Box flexGrow={1} />
          <Box
            pt={5}
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            flexDir="column"
          >
            <Text
              letterSpacing="-10px"
              fontFamily={DEFAULT_MONO_FONT}
              lineHeight="0.9em"
              fontWeight="100"
              fontSize="12em"
              color={isDay ? "black" : "white"}
            >
              {weather.current.temp.toFixed(0)}°
            </Text>
            <Text
              fontWeight="100"
              fontSize="2em"
              color={isDay ? "black" : "white"}
            >
              {liveWeather.description}
            </Text>
            <Box display="flex" flexDir="row">
              <Text
                fontSize="2em"
                fontWeight="100"
                fontFamily={DEFAULT_MONO_FONT}
                display="flex"
                flexDir="row"
                alignItems="center"
                justifyContent="center"
                color={isDay ? "black" : "white"}
              >
                <CgArrowLongUpC />
                {todaysWeather.temp.max.toFixed(0)}°
                <Divider orientation="vertical" marginLeft="1" />
                <CgArrowLongDownC />
                {todaysWeather.temp.min.toFixed(0)}°
              </Text>
            </Box>
          </Box>
          <Divider orientation="vertical" />
          <Box display="flex" flexDir="column">
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              flexDir="column"
            >
              <WiHumidity color={isDay ? "black" : "white"} fontSize="60px" />
              <Text
                fontFamily={DEFAULT_MONO_FONT}
                lineHeight="60px"
                fontWeight="400"
                fontSize="3em"
                color={isDay ? "black" : "white"}
              >
                {weather.current.humidity}%
              </Text>
              <Text
                fontWeight="100"
                fontSize="2em"
                color={isDay ? "black" : "white"}
              >
                Humidity
              </Text>
            </Box>
            <Box flexGrow={1} />
            <Divider mt={2} mb={6} />
            <Box flexGrow={1} />
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDir="column"
            >
              <FaTemperatureHigh
                color={isDay ? "black" : "white"}
                fontSize="40px"
              />
              <Text
                fontFamily={DEFAULT_MONO_FONT}
                lineHeight="60px"
                fontWeight="400"
                fontSize="3em"
                color={isDay ? "black" : "white"}
              >
                {weather.current.feels_like.toFixed(0)}°
              </Text>
              <Text
                fontWeight="100"
                fontSize="2em"
                color={isDay ? "black" : "white"}
              >
                Feels Like
              </Text>
            </Box>
          </Box>
          <Divider orientation="vertical" />
          <Box flexGrow={1} />
          <Box display="flex" flexDir="column">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDir="column"
            >
              <BsFillArrowUpCircleFill
                color={isDay ? "black" : "white"}
                fontSize="56px"
                style={{
                  transform: `rotate(${weather.current.wind_deg}deg)`,
                  transition: "transform 1250ms ease-in-out",
                }}
              />
              <Text
                fontFamily={DEFAULT_MONO_FONT}
                lineHeight="60px"
                fontWeight="200"
                fontSize="3em"
                color={isDay ? "black" : "white"}
              >
                {weather.current.wind_speed.toFixed(0)}mph
              </Text>
              <Text
                fontWeight="100"
                fontSize="2em"
                color={isDay ? "black" : "white"}
              >
                Wind
              </Text>
            </Box>
            <Box flexGrow={1} />
            {weather.current?.wind_gust && (
              <>
                <Divider mt={2} mb={2} />
                <Box flexGrow={1} />
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDir="column"
                >
                  <WiStrongWind
                    color={isDay ? "black" : "white"}
                    fontSize="60px"
                  />
                  <Text
                    fontFamily={DEFAULT_MONO_FONT}
                    lineHeight="60px"
                    fontWeight="200"
                    fontSize="3em"
                    color={isDay ? "black" : "white"}
                  >
                    {weather.current?.wind_gust?.toFixed(0)}mph
                  </Text>
                  <Text
                    fontWeight="100"
                    fontSize="2em"
                    color={isDay ? "black" : "white"}
                  >
                    Gusts
                  </Text>
                </Box>
              </>
            )}
          </Box>
          <Box flexGrow={1} />
        </Box>
        <Divider mt={8} mb={2} opacity={isDay ? 0.6 : 0.5} />
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
          flexDir="row"
          width="100%"
        >
          {daily.map((item: any, index: any) => {
            if (index !== 0 && index < 4) {
              return (
                <>
                  <Box key={item} flexGrow={1} />
                  <Future forcast={item} index={index} />
                  <Box flexGrow={1} />
                </>
              );
            }
            return null;
          })}
        </Box>
      </Box>
    </ScaleFade>
  );
};
