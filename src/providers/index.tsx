import React from 'react';

const Context = React.createContext({
    value: {},
    socket: {
        emit: (view: string, data: any) => { }
    }
});

export const useGlobalState = () => React.useContext(Context);

export const Provider = (props: { children: React.ReactNode, value: any }) => {
    return (
        <Context.Provider value={props.value}>
            {props.children}
        </Context.Provider>
    )
}