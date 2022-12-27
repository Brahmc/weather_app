import {Col, Row} from "react-bootstrap";
import {WiDirectionUp} from "react-icons/wi";
import {WeatherDataPoint} from "../components/WeatherDataPoint";

export function DayWeatherData({weatherData}) {
    return (
        <>
            <Row xs={9} style={{paddingLeft: ".6rem"}} >
                <Col xs={1} style={{padding: 0}}>Hour</Col>
                <Col xs={1} style={{padding: 0}}>WindDir</Col>
                <Col xs={5} style={{padding: 0}}>WindSpeed</Col>
                <Col xs={5} style={{padding: 0}}>Temp</Col>
            </Row>
            <div style={{overflow: "hidden"}} className='rounded'>
                {weatherData?.map(d =>
                    <Row key={d.time} className='p-2'
                         style={{backgroundImage: `linear-gradient(90deg, rgba(${d.wspd < 20 ? 58 : 15 * (d.wspd - 20)}, ${15.6 * d.wspd} , ${d.wspd < 20 ? 204 : 204 - 4 * d.wspd}, .8), rgba(0, 0, 0, .024) 17%`,
                             borderBottom: "solid rgba(255, 255, 255, .4) 2px"}}
                    >
                        <WeatherDataPoint value={(new Date(d.time).getHours())} width={1} />
                        <WeatherDataPoint value={<WiDirectionUp style={{transform: `rotate(${d.wdir}deg)`}} />} width={1} />
                        <WeatherDataPoint value={`${d.wspd} km/h`} note={d.wpgt ? `max ${d.wpgt} km/h` : ''} />
                        <WeatherDataPoint title='temp' value={d.temp + '°C'} note={`${d.pres} hPa`}/>
                    </Row>
                )}
            </div>
        </>
    )
}

