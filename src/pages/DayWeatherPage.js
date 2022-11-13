import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {LocationSearch} from "../components/LocationSearch";
import {SearchModal} from "../components/SearchModal";
import {useLocationContext} from "../contexts/locationContext";
import {CiLocationArrow1} from "react-icons/ci";

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
    return date.getFullYear() + "-" + date.getMonth() + "-" + (~~date.getDate() +1);
}

function DayWeatherData({weatherData}) {
    return (
        <>
            {weatherData?.map(d =>
                <Row key={d.time} className='p-2'>
                    <WeatherDataPoint value={(new Date(d.time).getHours())} width={1} />
                    <WeatherDataPoint value={<CiLocationArrow1 style={{transform: `rotate(${d.wdir -45}deg)`}} />} width={1} />
                    <WeatherDataPoint value={`${d.wspd} km/h`} note={d.wpgt ? `max ${d.wpgt} km/h` : ''} />
                    <WeatherDataPoint title='temp' value={d.temp + '°C'} note={`${d.pres} hPa`}/>
                </Row>
            )}
        </>
    )
}

function WeatherDataPoint({value, note, style, width}) {
    return (
        <Col xs={width ? width : 5} style={style} className='d-flex justify-content-center flex-column'>
            {note ? <Row>{value}</Row> : value}
            {note ? <Row style={{fontSize: ".7em"}}>{note}</Row> : ''}
        </Col>
    )
}

