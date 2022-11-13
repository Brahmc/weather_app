import {Button} from "react-bootstrap";
import {useState} from "react";
import {LocationSearch} from "../components/LocationSearch";
import {SearchModal} from "../components/SearchModal";
import {useLocationContext} from "../contexts/locationContext";

export function DayWeatherPage() {
    const {location} = useLocationContext();
    const [showSearch, setShowSearch] = useState(false);
    if(location === undefined) return;


    return (
        <>
            <Button variant="primary" onClick={() => setShowSearch(!showSearch)}>
                Launch demo modal
            </Button>
            <SearchModal title='Search' show={showSearch} setShow={setShowSearch}>
                <LocationSearch />
            </SearchModal>
        </>
    );
}

