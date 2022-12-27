import {Button, Col, Container} from "react-bootstrap";
import {SearchModal} from "../components/SearchModal";
import {useLocationContext} from "../contexts/locationContext";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {DayWeatherData} from "../components/DayWeatherData";
import {useCurrentLocationData} from "../hooks/useCurrentLocationData";

export function DayWeatherPage() {
    const {location} = useLocationContext();
    const [locationWeather, date, addDays] = useCurrentLocationData();


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



