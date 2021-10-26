import React from "react";

export const useIsDay = () => {
    const [isDay, setIsDay] = React.useState(new Date().getHours() >= 6 && new Date().getHours() <= 17);

    React.useLayoutEffect(() => {
        const checkTimeOfDay = () => {
            if (new Date().getHours() >= 6 && new Date().getHours() <= 17) {
                setIsDay(true);
            }
            else {
                setIsDay(false);
            }
            setTimeout(() => {
                checkTimeOfDay();
            }, 300000);
        }
        checkTimeOfDay();
    }, []);

    // if (new Date().getHours() >= 6 && new Date().getHours() <= 17) {
    //     return true
    // }
    return isDay;
}

export const useTimeOfDay = () => {
    const [timeOfDay, setTimeOfDay] = React.useState(new Date().getHours());
    console.log(timeOfDay)
    React.useLayoutEffect(() => {
        const checkTimeOfDay = () => {
            setTimeOfDay(new Date().getHours())
            setTimeout(() => {
                checkTimeOfDay();
            }, 36000000);
        }
    }, [])

    return timeOfDay;
}