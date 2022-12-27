import {LocationList} from "./LocationList";

export function PlaceSuggestions({locations, onClick}) {
    return (
        <div style={{whiteSpace: "nowrap", borderColor: "grey"}} className={'border border-top-0 rounded ' + (locations ? '' : 'border-bottom-0')}>
            <LocationList locations={locations} onClick={onClick}/>
        </div>);
}