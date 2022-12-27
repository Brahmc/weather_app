import {useLocationContext} from "../contexts/locationContext";
import {DayWeatherPage} from "../pages/DayWeatherPage";
import {SearchPage} from "../pages/SearchPage";

export function PageNavigator() {
    const {location} = useLocationContext();
    return (
        <>
            {location ? <DayWeatherPage /> : <SearchPage />}
        </>
    );
}