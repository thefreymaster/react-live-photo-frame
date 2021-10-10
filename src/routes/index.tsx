import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Clock } from '../components/Clock/index';
import { Controller } from '../components/Controller';
import { Video } from '../components/Video/index';

export const Routes = (props: { socket: any }) => {
    return (
        <Switch>
            <Route path="/weather">
                weather
            </Route>
            <Route path="/clock">
                <Clock />
            </Route>
            <Route path="/videos">
                <Video />
            </Route>
            <Route path="/controller">
                <Controller socket={props.socket} />
            </Route>
            <Route path="/*">
                <Redirect to="/controller" />
            </Route>
        </Switch>
    )
}