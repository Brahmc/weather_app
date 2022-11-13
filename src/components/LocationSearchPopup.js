import {Container, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";

export function LocationSearchPopup({onSubmit, show, setShow}) {
    const[search, setSearch] = useState("");
    const [places, setPlaces] = useState(undefined);

    useEffect(() => {
        if(search.trim() === "") {
            setPlaces(undefined);
            return;
        }
        fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + search + ".json?access_token=" + process.env.REACT_APP_MAPBOX_API_KEY)
            .then(response => response.json())
            .then(data => {setPlaces(data.features) ;console.log(data)});
    }, [search, setPlaces]);

    return (
        <SearchModal title='Search' show={show} setShow={setShow}>
            <Container>
                <Form.Control value={search} onChange={e => setSearch(e.target.value)} />
                <PlaceSuggestions places={places} onClick={(p) => onSubmit(p)}/>
            </Container>
        </SearchModal>
    );
}

function PlaceSuggestions({places, onClick}) {
    return places?.map((p, index) => <div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}} className='ps-3 p-2' onClick={() => onClick(p)} key={index}>{p.matching_place_name ? p.matching_place_name + " (" + p.place_name + ")" : p.place_name}</div>)
}

function SearchModal({title, show, setShow, children}) {
    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            {children}
            <Modal.Footer />
        </Modal>
    )
}