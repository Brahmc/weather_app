import {LocationSearch} from "../components/LocationSearch";
import {useLocationContext} from "../contexts/locationContext";

export function SearchPage() {
    const {location} = useLocationContext();
    if(location !== undefined) return;
    return (
        <main style={{textAlign: "center"}}>
            <h1>weather_app</h1>
            <LocationSearch />
        </main>
    )
}