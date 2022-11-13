import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {LocationSearch} from "../components/LocationSearch";
import {SearchModal} from "../components/SearchModal";
import {useLocationContext} from "../contexts/locationContext";

export function DayWeatherPage() {
    const {location} = useLocationContext();
    const [showSearch, setShowSearch] = useState(false);
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

            fetch("https://meteostat.p.rapidapi.com/point/hourly?lat=" + location.center[1] + "&lon=" + location.center[0] +"&start=2020-01-01&end=2020-01-01&alt=113&tz=Europe%2FBerlin", options)
                .then(response => response.json())
                .then(data => {setLocationWeather(data.data); console.log(data)});
    }, [location]);
    if(location === undefined) return;




    return (
        <>
            <Button variant="primary" onClick={() => setShowSearch(!showSearch)}>
                Search
            </Button>
            <h1>{location.place_name}</h1>
            <SearchModal title='Search' show={showSearch} setShow={setShowSearch}>
                <LocationSearch />
            </SearchModal>
        </>
    );
}

