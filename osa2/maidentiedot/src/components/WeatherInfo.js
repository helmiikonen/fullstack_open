
import { useState } from 'react'

const WeatherInfo = ({country, PrintWeather, getWeatherData}) => {

    const [weatherData, setWeatherData] = useState([])
    const [weatherInfoReady, setWeatherInfoReady] = useState(false)
    const [currentCountry, setCurrentCountry] = useState(country.name.common)

    const api_key = process.env.REACT_APP_API_KEY
    const [lat, lon] = country.capitalInfo.latlng
     
    if (country.name.common !== currentCountry) {
        setCurrentCountry(country.name.common)
        setWeatherInfoReady(false)
    }

    if (! weatherInfoReady) {
        getWeatherData(lat, lon, api_key)
        .then(response => {
            if (response !== undefined) {
                const temp = response.main.temp
                const icon = response.weather[0].icon
                const description = response.weather[0].description
                const wind = response.wind.speed
                setWeatherData([temp, icon, description, wind])
                setWeatherInfoReady(true)
            } 
        })
        .catch(error => console.log(error))
    }
    
    if (weatherData !== [] && weatherInfoReady) {
        return (
            <div>
                <PrintWeather weatherData={weatherData}/>
            </div>
        )
    } else {
        return null
    }
    
}

export default WeatherInfo


