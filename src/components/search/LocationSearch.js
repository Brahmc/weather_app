import {Container, Form} from "react-bootstrap";
import {useSearchLocation} from "../../hooks/useSearchLocation";
import {PlaceSuggestions} from "./PlaceSuggestions";
import {RecentLocations} from "./RecentLocations";

export function LocationSearch({onSearch, showRecent}) {
    const [search, setSearch, locations, searchLocation] = useSearchLocation(onSearch);

    return (
        <Container style={{textAlign: "left"}}>
            <Form onSubmit={(e) => {e.preventDefault(); searchLocation(locations[0])}}>
                <Form.Control className='ps-3' value={search} placeholder='Search for location' onChange={e => setSearch(e.target.value)} />
                <PlaceSuggestions locations={locations} onClick={(l) => searchLocation(l)}/>
            </Form>
            {showRecent ? <RecentLocations onClick={(l) => searchLocation(l)} /> : ''}
        </Container>
    );
}

