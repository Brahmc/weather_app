import {Button, Col, Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import {SearchModal} from "../components/SearchModal";
import {useLocationContext} from "../contexts/locationContext";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {DayWeatherData} from "../components/DayWeatherData";

export function DayWeatherPage() {
    const {location} = useLocationContext();

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

    function addDays(days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        setDate(result);
    }

    return (
        <Container>
            <h1>{location.place_name}</h1>


            <Col className='d-flex flex-row'>
                <Button className='me-2' onClick={() => addDays(-1)}>
                    <FaArrowLeft />
                </Button>
                <Button className='me-2' onClick={() => addDays(1)}>
                    <FaArrowRight />
                </Button>
                <SearchModal title='Search'/>
            </Col>

            <span>{date.toDateString()}</span>
            <DayWeatherData weatherData={locationWeather?.data} />
        </Container>
    );
}

function formatDate(date) {
    const zeroFormat = n => n < 10 ? "0" + n : n;
    return date.getFullYear() + "-" + zeroFormat(date.getMonth() + 1) + "-" + zeroFormat(date.getDate());
}



