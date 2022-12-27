import {Col, Row} from "react-bootstrap";
import {WiDirectionUp} from "react-icons/wi";

export function DayWeatherData({weatherData}) {
    return (
        <div style={{overflow: "hidden"}} className='rounded'>
            {weatherData?.map(d =>
                <Row key={d.time} className='p-2'
                     style={{backgroundImage: `linear-gradient(90deg, rgba(58, ${15.6 * d.wspd} , 204, .8), rgba(0, 0, 0, .024) 17%`,
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