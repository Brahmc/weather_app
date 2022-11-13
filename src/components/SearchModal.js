import {Modal} from "react-bootstrap";

export function SearchModal({title, show, setShow, children}) {
    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            {children}
            <Modal.Footer />
        </Modal>
    );
}