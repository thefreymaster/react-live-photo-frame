import React from 'react';
import AnalogClock from 'react-analog-clock';
import { useIsDay } from '../../hooks/index';

export const Clock = () => {
    const isDay = useIsDay();
    const theme = {
        background: isDay ? '#fff' : '#000',
        center: isDay ? '#000' : '#fff',
        seconds: isDay ? '#000' : '#fff',
        minutes: isDay ? '#000' : '#fff',
        hour: isDay ? '#000' : '#fff',
        tick: isDay ? '#000' : '#fff',
        smallTickWidth: 2,
        largeTickWidth: 4,
        secondHandWidth: 3,
        minuteHandWidth: 6,
        hourHandWidth: 8,
    };
    return (
        <AnalogClock theme={theme} />
    )
}