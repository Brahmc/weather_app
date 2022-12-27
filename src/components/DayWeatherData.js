import {Col, Row} from "react-bootstrap";
import {DayWeatherDataColumns} from "../components/DayWeatherDataColumns";

export function DayWeatherData({weatherData}) {
    return (
        <>
            <Row xs={9} style={{paddingLeft: ".6rem"}} >
                <Col xs={1} style={{padding: 0}}>Hour</Col>
                <Col xs={1} style={{padding: 0}}>WindDir</Col>
                <Col xs={5} style={{padding: 0}}>WindSpeed</Col>
                <Col xs={5} style={{padding: 0}}>Temp</Col>
            </Row>
            <DayWeatherDataColumns weatherData={weatherData} />
        </>
    )
}

