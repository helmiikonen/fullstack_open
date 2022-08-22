
const CountryInfo = ({country, WeatherInfo, PrintWeather, getWeatherData}) => {

    const languages = Object.values(country.languages)
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population.toLocaleString()}</p>
            <p>area {country.area.toLocaleString()} km<sup>2</sup> </p>
            <h4>languages:</h4>
            <ul>
                {languages.map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.png} alt="flag" />
            <h3>Weather in {country.capital}</h3>
            <WeatherInfo country={country} PrintWeather={PrintWeather} 
                getWeatherData={getWeatherData}/>
        </div>
    )
}

export default CountryInfo

