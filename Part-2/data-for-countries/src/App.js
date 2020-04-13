import React, { useState, useEffect } from 'react';
import axios from 'axios'


const CountryList = ({ searchResults, handleShowCountry }) => {

  return searchResults.map(country =>
    <li key={country.numericCode}>
      {country.name} <button onClick={() => handleShowCountry(country)}>show</button>
    </li>)
}


const Country = ({ country }) => {

  return (
    <>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h3>Languages</h3>
      {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      <br />
      <img src={country.flag} alt={country.name} style={{ width: '150px' }} />
    </>
  )
}


function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  useEffect(() => {
    searchTerm.length
      ? setSearchResults(countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())))
      : setSearchResults([])
  }, [searchTerm, countries])


  const handleFilterChange = (event) => {
    setSearchTerm(event.target.value)
  }


  const handleShowCountry = (clickedCountry) => {
    setSearchResults([clickedCountry])
  }

  const showContent = () => {
    if (searchResults.length > 10) return <p>Too many matches, specify another filter</p>
    if (searchResults.length === 1) {
      return <Country country={searchResults[0]} />
    }
    if (searchResults.length > 1 && searchResults.length <= 10) {
      return <CountryList searchResults={searchResults} handleShowCountry={handleShowCountry}/>
    }
  }


  return (
    <div>
      find countries: <input value={searchTerm} onChange={handleFilterChange} />
      {showContent()}
    </div>
  );
}

export default App;
