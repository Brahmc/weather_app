import {useRecentLocations} from "../../hooks/useRecentLocations";
import {LocationList} from "./LocationList";

export function RecentLocations({onClick}) {
    const {recentLocations} = useRecentLocations();
    return(
        <>
            <h3>Recent locations</h3>
            <LocationList locations={recentLocations} onClick={onClick}/>
        </>
    )
}