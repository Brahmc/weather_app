import './App.css';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LocationProvider} from "./contexts/locationContext";
import {PageNavigator} from "./components/PageNavigator";

function App() {
  return (
      <LocationProvider>
          <PageNavigator />
      </LocationProvider>
  );
}

export default App;
