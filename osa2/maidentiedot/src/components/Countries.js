
const Countries = ({countriesToShow, filterState, showCountry, CountryInfo, WeatherInfo, PrintWeather, getWeatherData}) => {
   
    if (filterState===false) {
        return <div></div>
    }

    else if (countriesToShow.length === 0) {
        return <div>Too many matches, specify another filter</div>
    } 

    else if (countriesToShow.length === 1) {
        const country = countriesToShow[0]
        return (
            <CountryInfo country={country} WeatherInfo={WeatherInfo} PrintWeather={PrintWeather}
                getWeatherData={getWeatherData}/>
        )
    }

    else {
        return (
            <div>
                {countriesToShow.map(country => <p key={country.name.common}>
                {country.name.common} 
                <button onClick={() => showCountry(country)}>show</button></p>)}
            </div>
        )
    }
}

export default Countries