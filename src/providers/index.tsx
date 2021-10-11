import React from 'react';

const Context = React.createContext({
    value: {},
    socket: {
        emit: (view: string, data: any) => { }
    },
    device: 'frame',
    setDevice: (s: string) => {}
});

export const useGlobalState = () => React.useContext(Context);

export const Provider = (props: { children: React.ReactNode, value: any }) => {
    return (
        <Context.Provider value={{ ...props as any }}>
            {props.children}
        </Context.Provider>
    )
}