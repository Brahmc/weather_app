import {Container, Form} from "react-bootstrap";
import {useSearchLocation} from "../hooks/useSearchLocation";

export function LocationSearch({onSearch, showRecent}) {
    const [search, setSearch, locations, recentLocations, searchLocation] = useSearchLocation(onSearch);

    return (
        <Container style={{textAlign: "left"}}>
            <Form onSubmit={(e) => {e.preventDefault(); searchLocation(locations[0])}}>
                <Form.Control className='ps-3' value={search} placeholder='Search for location' onChange={e => setSearch(e.target.value)} />
                <PlaceSuggestions locations={locations} onClick={(l) => searchLocation(l)}/>
            </Form>
            {showRecent ? <RecentLocations locations={recentLocations} onClick={(l) => searchLocation(l)} /> : ''}
        </Container>
    );
}

function PlaceSuggestions({locations, onClick}) {
    return (
    <div style={{whiteSpace: "nowrap", borderColor: "grey"}} className={'border border-top-0 rounded ' + (locations ? '' : 'border-bottom-0')}>
        <LocationList locations={locations} onClick={onClick}/>
    </div>);
}

function RecentLocations({locations, onClick}) {
    return(
        <>
            <h3>Recent locations</h3>
            <LocationList locations={locations} onClick={onClick}/>
        </>
    )
}

function LocationList({locations, onClick}) {
    return locations?.map((l, index) =>
        <div style={{overflow: "hidden", textOverflow: "ellipsis"}}
             className='ps-3 p-2'
             onClick={() => onClick(l)}
             key={index}>
            {l.matching_place_name ? l.matching_place_name + " (" + l.place_name + ")" : l.place_name}
        </div>);
}

