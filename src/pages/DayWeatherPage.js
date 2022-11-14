import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {LocationSearch} from "../components/LocationSearch";
import {SearchModal} from "../components/SearchModal";
import {useLocationContext} from "../contexts/locationContext";
import {WiDirectionUp} from "react-icons/wi";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

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
                <Button className='me-2' variant="primary" onClick={() => setShowSearch(!showSearch)}>
                    Search
                </Button>
            </Col>

            <span>{date.toDateString()}</span>
            <DayWeatherData weatherData={locationWeather?.data} />

            <SearchModal title='Search' show={showSearch} setShow={setShowSearch}>
                <LocationSearch onSearch={() => setShowSearch(false)} />
            </SearchModal>
        </Container>
    );
}

function formatDate(date) {
    const zeroFormat = n => n < 10 ? "0" + n : n;
    return date.getFullYear() + "-" + zeroFormat(date.getMonth() + 1) + "-" + zeroFormat(date.getDate());
}

function DayWeatherData({weatherData}) {
    return (
        <div style={{overflow: "hidden"}} className='rounded'>
            {weatherData?.map(d =>
                <Row key={d.time} className='p-2'
                     style={{backgroundImage: `linear-gradient(90deg, rgba(58, ${78 * (.18 * d.wpgt)} , 204, .8), rgba(0, 0, 0, .024) 17%`,
                     borderBottom: "solid rgba(255, 255, 255, .4) 2px"}}
                >
                    <WeatherDataPoint value={(new Date(d.time).getHours())} width={1} />
                    <WeatherDataPoint value={<WiDirectionUp style={{transform: `rotate(${d.wdir}deg)`}} />} width={1} />
                    <WeatherDataPoint value={`${d.wspd} km/h`} note={d.wpgt ? `max ${d.wpgt} km/h` : ''} />
                    <WeatherDataPoint title='temp' value={d.temp + '°C'} note={`${d.pres} hPa`}/>
                </Row>
            )}
        </div>
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

