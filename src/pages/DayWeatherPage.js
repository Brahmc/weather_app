import {Button} from "react-bootstrap";
import {useState} from "react";
import {LocationSearch} from "../components/LocationSearch";
import {SearchModal} from "../components/SearchModal";

export function DayWeatherPage() {
    const [showSearch, setShowSearch] = useState(true);

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

