import { useState } from "react";
import logo from "/weather.png";
import "./App.css"

function App() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=fd29f4265bc04759a6a92137241707&q=${city}&lang=en`
    )

      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data)
        setWeatherForecast(data);
        setCity("")
      });
  };

  return (
    <div>
      {/* <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand text-white">Rain Check</a>
      </nav> */}

      <main className="container d-flex align-items-center justify-content-center mx-auto" >
        <div className="jumbotron text-center mt-4">
          <img src={logo} className="img-fluid w-50" />
          <h1>Search for a city and check the weather!</h1>
          {/* <p className="lead">Search a city:</p> */}

          <div className="row mb-4">
            <div className="com-md-6">
              <input
                placeholder="Type a City"
                onChange={handleCity}
                className="form-control"
                value={city}
              />
            </div>
          </div>

          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>

          {weatherForecast ? (
            <div>
              <div>
                <div>
                  <img className="icon_size" src={weatherForecast.current.condition.icon} />
                </div>
                <div>
                  <h2>{weatherForecast.location.name}, {weatherForecast.location.region} - {weatherForecast.location.country}</h2>
                  <h3>Condition: {weatherForecast.current.condition.text}</h3>
                  <p className="lead">
                    Temp: {weatherForecast.current.temp_c}ºC <br />
                    Local Time: {weatherForecast.location.localtime.split(' ')[1]}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;