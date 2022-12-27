import {useLocalStorage} from "../hooks/useLocalStorage";

export function useRecentLocations() {
    const [recentLocations, setRecentLocations] = useLocalStorage('recentLocations', []);
    const addRecentLocation = (location) => {
        const newRecent = recentLocations.filter(l => l.id !== location.id);
        if(newRecent.length >= 4) newRecent.pop();
        setRecentLocations([location, ...newRecent]);
    }

    return {recentLocations, addRecentLocation};
}