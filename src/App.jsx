import WeatherApp from "./components/WeatherApp/WeatherApp";
import Provider from "./context/Provider";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Provider>
        <WeatherApp />
      </Provider>
    </div>
  );
}

export default App;
