import {createContext, useContext, useMemo, useState} from "react";

const LocationContext = createContext();

export function LocationProvider(props) {
    const [location, setLocation] = useState(undefined);
    console.log({location: location});

    const api = useMemo(() => ({
        location: location, setLocation: setLocation
    }), [location, setLocation]);

    return <LocationContext.Provider value={api}>
        {props.children}
    </LocationContext.Provider>
}

export const useLocationContext = () => useContext(LocationContext);