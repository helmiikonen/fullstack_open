
const PrintWeather = ({weatherData}) => {
    
    return (
        <div>
            <p>temperature {weatherData[0]} Celcius</p>
            <img src={`http://openweathermap.org/img/wn/${weatherData[1]}@2x.png`} 
                alt="weather icon"/>
            <p>{weatherData[2]}, wind {weatherData[3]} m/s</p>
        </div>
    )
}

export default PrintWeather