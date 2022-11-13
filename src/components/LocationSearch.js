import {Container, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useLocationContext} from "../contexts/locationContext";

export function LocationSearch() {
    const[search, setSearch] = useState("");
    const [locations, setLocations] = useState(undefined);
    const {setLocation} = useLocationContext();

    useEffect(() => {
        if(search.trim() === "") {
            setLocations(undefined);
            return;
        }
        fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + search + ".json?access_token=" + process.env.REACT_APP_MAPBOX_API_KEY)
            .then(response => response.json())
            .then(data => {setLocations(data.features) ;console.log(data)});
    }, [search, setLocations]);

    return (
        <Container style={{textAlign: "left"}}>
            <Form onSubmit={(e) => {e.preventDefault(); setLocation(locations[0])}}>
                <Form.Control className='ps-3' value={search} placeholder='Search for location' onChange={e => setSearch(e.target.value)} />
                <PlaceSuggestions locations={locations} onClick={(l) => setLocation(l)}/>
            </Form>

        </Container>
    );
}

function PlaceSuggestions({locations, onClick}) {
    return (
    <div style={{whiteSpace: "nowrap"}}>
        {locations?.map((l, index) =>
            <div style={{overflow: "hidden", textOverflow: "ellipsis"}}
                 className='ps-3 p-2'
                 onClick={() => onClick(l)}
                 key={index}>
                {l.matching_place_name ? l.matching_place_name + " (" + l.place_name + ")" : l.place_name}
            </div>)}
    </div>);
}

