import './App.css';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DayWeatherPage} from "./pages/DayWeatherPage";
import {SearchPage} from "./pages/SearchPage";
import {LocationProvider} from "./contexts/locationContext";


function App() {
  return (
      <LocationProvider>
          <SearchPage />
          <DayWeatherPage />
      </LocationProvider>
  );
}

export default App;
