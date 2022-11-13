import {Button, Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import {LocationSearch} from "../components/LocationSearch";
import {SearchModal} from "../components/SearchModal";
import {useLocationContext} from "../contexts/locationContext";

export function DayWeatherPage() {
    const {location} = useLocationContext();
    const [showSearch, setShowSearch] = useState(false);
    const [locationWeather, setLocationWeather] = useState(undefined);
    const [date, setDate] = useState(new Date());

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
        console.log(formatDate(date));
        fetch("https://meteostat.p.rapidapi.com/point/hourly?" + new URLSearchParams({
            lat: location.center[1],
            lon: location.center[0],
            start: formatDate(date),
            end: formatDate(date),
            alt: '113',
            tz: "Europe/Berlin"
        }), options)
            .then(response => response.json())
            .then(data => {setLocationWeather(data.data); console.log(data)});

    }, [date, location]);
    if(location === undefined) return;

    return (
        <Container>
            <Button variant="primary" onClick={() => setShowSearch(!showSearch)}>
                Search
            </Button>
            <h1>{location.place_name}</h1>
            <span>{date.toDateString()}</span>
            <SearchModal title='Search' show={showSearch} setShow={setShowSearch}>
                <LocationSearch />
            </SearchModal>
        </Container>
    );
}

function formatDate(date) {
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
}

