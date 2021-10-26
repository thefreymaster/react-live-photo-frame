import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { Clock } from '../components/Clock/index';
import { Controller } from '../components/Controller';
import { Video } from '../components/Video/index';
import { Device } from '../components/Device/index';
import { Weather } from '../components/Weather';
import { DigitalClock } from '../components/DigitalClock/index';
import { useTimeOfDay } from '../hooks';
import { Holiday } from '../Holiday';

export const Routes = (props: { socket: any, device: string }) => {
    const timeOfDay = useTimeOfDay();
    const history = useHistory();
    // if(timeOfDay === 7){
    //     history.push('/weather')
    // }
    // if(timeOfDay === 21){
    //     history.push('/digital-clock')
    // }
    return (
        <Switch>
            <Route path="/weather">
                <Weather />
            </Route>
            <Route path="/clock">
                <Clock />
            </Route>
            <Route path="/digital-clock">
                <DigitalClock />
            </Route>
            <Route path="/videos/:name">
                <Video />
            </Route>
            <Route path="/controller">
                <Controller socket={props.socket} />
            </Route>
            <Route path="/device">
                <Device />
            </Route>
            <Route path="/holiday">
                <Holiday />
            </Route>
            <Route path="/*">
                <Redirect to="/controller" />
            </Route>
        </Switch>
    )
}