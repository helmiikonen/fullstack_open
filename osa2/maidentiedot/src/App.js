import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Countries from './components/Countries'
import CountryInfo from './components/CountryInfo'
import PrintWeather from './components/PrintWeather'
import WeatherInfo from './components/WeatherInfo'


const App = () => {

    const [countries, setCountries] = useState([])
  	const [filter, setFilter] = useState('')
  	const [countriesToShow, setCountriesToShow] = useState([])
  	const [filterState, setFilterState] = useState(false)

	useEffect(() => {
		axios
		.get('https://restcountries.com/v3.1/all')
		.then(response => {
			setCountries(response.data)
		})
	}, [])

	const getWeatherData = (lat, lon, api_key) => {
		const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
		return request.then(response => response.data)
	}

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
		if (event.target.value !== '') {
			setFilterState(true)
			const filter = event.target.value
			const filteredCountries = countries.filter(country =>
				country.name.common.toLowerCase().includes(filter.toLowerCase()))
			if (filteredCountries.length === 0) {
				setFilterState(false)
				setCountriesToShow([])
			} else if (filteredCountries.length <= 10) {
				setCountriesToShow(filteredCountries)
			} else {
				setCountriesToShow([])
			}    
		} else {
			setFilterState(false)
			setCountriesToShow([])
		}
	}

	const showCountry = (country) => {
		setCountriesToShow([country])
	}

	return (
		<div>
			<Filter filter={filter} handleFilterChange={handleFilterChange}/>
			<Countries countriesToShow={countriesToShow} filterState={filterState} 
				showCountry={showCountry} CountryInfo={CountryInfo} WeatherInfo={WeatherInfo}
				PrintWeather={PrintWeather} getWeatherData={getWeatherData}/>
		</div>
	)
}

export default App
