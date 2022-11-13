import {Button} from "react-bootstrap";
import {useState} from "react";
import {LocationSearchPopup} from "../components/LocationSearchPopup";

export function DayWeather() {
    const [showSearch, setShowSearch] = useState(true);

    return (
        <>
            <Button variant="primary" onClick={() => setShowSearch(!showSearch)}>
                Launch demo modal
            </Button>

            <LocationSearchPopup show={showSearch} setShow={setShowSearch} />
        </>
    );
}

