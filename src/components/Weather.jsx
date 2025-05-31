import React, { useEffect, useRef, useState } from "react";
import "../css/Weather.css";
import search_icon from "../assets/search.png";
import sunny_weather from "../assets/clear.png";
import cloudy_weather from "../assets/cloud.png";
import drizzle_weather from "../assets/drizzle.png";
import humidity_weather from "../assets/humidity.png";
import rainy_weather from "../assets/rain.png";
import snow_weather from "../assets/snow.png";
import windy_weather from "../assets/wind.png";

function Weather() {
    const [weatherData, setWeatherData] = useState(false);
    const inputRef = useRef();
    const apiKey = import.meta.env.VITE_API_KEY
    const weather_condition_codes = {
        "01d": sunny_weather,
        "01n": sunny_weather,
        "02d": cloudy_weather,
        "02n": cloudy_weather,
        "03d": cloudy_weather,
        "03n": cloudy_weather,
        "04d": drizzle_weather,
        "04n": drizzle_weather,
        "09d": rainy_weather,
        "09n": rainy_weather,
        "10d": rainy_weather,
        "10n": rainy_weather,
        "13d": snow_weather,
        "13n": snow_weather,
    }

    async function search(city_name) {
        if (!city_name) {
            alert("City name can't be empty.");
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json()

            if(!response.ok){ alert(data.message); return; }

            const icon = weather_condition_codes[data.weather[0].icon] || sunny_weather;
            console.log(data);
            setWeatherData(
                {
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    temperature: Math.floor(data.main.temp),
                    place: data.name,
                    icon: icon
                }
            )
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        search("Pune");
    }, []);

    return (
        <>
            <div className="weather">
                <div className="search-bar">
                    <input type="text" placeholder="Search for place..." ref={inputRef} />
                    <img src={search_icon} alt="Search Action" onClick={() => search(inputRef.current.value)} />
                </div>
                {weatherData ?
                    <>
                        <img src={weatherData.icon} alt="" className="weather-icon" />
                        <p className="temperature">{weatherData.temperature}°C</p>
                        <p className="place">{weatherData.place}</p>
                        <div className="weather-data">
                            <div className="col">
                                <img src={humidity_weather} alt="Humidity" className="humidity-indicator" />
                                <div>
                                    <p>{weatherData.humidity}</p>
                                    <span>Humidity</span>
                                </div>
                            </div>
                            <div className="col">
                                <img src={windy_weather} alt="Windspeed" className="wind-indicator" />
                                <div>
                                    <p>{weatherData.windSpeed} Km/h</p>
                                    <span>Windy</span>
                                </div>
                            </div>
                        </div>
                    </> :
                    <>
                        <div className="error-container">
                            <h1 className="errorMessage">Enter City name to see current weather.</h1>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default Weather;