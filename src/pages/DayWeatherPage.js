import {Button, Col, Container, Row} from "react-bootstrap";
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

        fetch("https://meteostat.p.rapidapi.com/point/hourly?" + new URLSearchParams({
            lat: location.center[1],
            lon: location.center[0],
            start: formatDate(date),
            end: formatDate(date),
            alt: '113',
            tz: "Europe/Berlin"
        }), options)
            .then(response => response.json())
            .then(data => {setLocationWeather(data); console.log(data)});

    }, [date, location]);
    if(location === undefined) return;

    return (
        <Container>
            <Button variant="primary" onClick={() => setShowSearch(!showSearch)}>
                Search
            </Button>
            <h1>{location.place_name}</h1>
            <span>{date.toDateString()}</span>
            <DayWeatherData weatherData={locationWeather?.data} />

            <SearchModal title='Search' show={showSearch} setShow={setShowSearch}>
                <LocationSearch onSearch={() => setShowSearch(false)} />
            </SearchModal>
        </Container>
    );
}

function formatDate(date) {
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
}

function DayWeatherData({weatherData}) {
    return (
        <>
            {weatherData?.map(d =>
                <Row key={d.time} className='p-2'>
                    <Col>{(new Date(d.time).getHours())}</Col>
                    <WeatherDataPoint title='temp' value={d.temp + '°C'}/>
                </Row>
            )}
        </>
    )
}

function WeatherDataPoint({value}) {
    return (
        <Col>
            <Row>{value}</Row>
        </Col>
    )
}

