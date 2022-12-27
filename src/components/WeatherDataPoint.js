import {Col, Row} from "react-bootstrap";

export function WeatherDataPoint({value, note, style, width}) {
    return (
        <Col xs={width ? width : 5} style={style} className='d-flex justify-content-center flex-column'>
            {note ? <Row>{value}</Row> : value}
            {note ? <Row style={{fontSize: ".7em"}}>{note}</Row> : ''}
        </Col>
    )
}