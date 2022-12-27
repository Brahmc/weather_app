import {useEffect, useState} from "react";
import {useLocationContext} from "../contexts/locationContext";

export function useCurrentLocationData() {
    const {location} = useLocationContext();
    const [date, setDate] = useState(new Date());
    const [locationWeather, setLocationWeather] = useState(undefined);


    useEffect(()  => {
        if(location === undefined) {
            setLocationWeather(undefined);
            return;
        }

        const options = {
            headers: {
                'x-rapidapi-host': 'meteostat.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_METEOSTAT_X_RAPID_API_KEY
            }
        }

        const searchParams = {
            lat: location.center[1],
            lon: location.center[0],
            start: formatDate(date),
            end: formatDate(date),
            tz: "Europe/Berlin"
        }

        fetch("https://meteostat.p.rapidapi.com/point/hourly?" + new URLSearchParams(searchParams), options)
            .then(response => response.json())
            .then(data => {setLocationWeather(data); console.log(data)});

    }, [date, location]);
    if(location === undefined) return;

    function addDays(days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        setDate(result);
    }

    return [locationWeather, date, addDays];
}

function formatDate(date) {
    const zeroFormat = n => n < 10 ? "0" + n : n;
    return date.getFullYear() + "-" + zeroFormat(date.getMonth() + 1) + "-" + zeroFormat(date.getDate());
}