import {useEffect, useState} from "react";
import {useLocationContext} from "../contexts/locationContext";
import {useRecentLocations} from "../hooks/useRecentLocations";

export function useSearchLocation(onSearch) {
    const[search, setSearch] = useState("");
    const [locations, setLocations] = useState(undefined);
    const {addRecentLocation} = useRecentLocations();
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

    function searchLocation(location) {
        if(onSearch) onSearch();
        addRecentLocation(location);
        setLocation(location);
    }

    return [search, setSearch, locations, searchLocation];
}