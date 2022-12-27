import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import {LocationSearch} from "../components/LocationSearch";

export function SearchModal({title}) {
    const [showSearch, setShowSearch] = useState(false);
    const handleClose = () => setShowSearch(false);

    return (
        <>
            <Button className='me-2' variant="primary" onClick={() => setShowSearch(true)}>
                {title}
            </Button>
            <Modal show={showSearch} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <LocationSearch onSearch={() => setShowSearch(false)} showRecent={true} />
                <Modal.Footer />
            </Modal>
        </>
    );
}