import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import {LocationSearch} from "../components/LocationSearch";

export function DayWeather() {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                    <LocationSearch onSubmit={() => {}} />
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
}

