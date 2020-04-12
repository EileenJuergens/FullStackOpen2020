import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({ searchTerm, handleFilterChange }) => {
  return (
    <>
      filter shown with: <input value={searchTerm} onChange={handleFilterChange} />
    </>
  )
}


const PersonForm = ({ addPerson, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} /><br />
          number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const Persons = ({ searchResults, persons }) => {
  return (
    <ul>
      {searchResults.length
        ? searchResults.map(person => <li key={person.name}>{person.name} {person.number}</li>)
        : persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  useEffect(() => {
    searchTerm.length
      ? setSearchResults(persons.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())))
      : setSearchResults([])

  }, [searchTerm, persons])

  const addPerson = event => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const dobbledName = persons.find(person => person.name === newName)

    dobbledName
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(personObject))

    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchTerm={searchTerm}
        handleFilterChange={handleFilterChange} />
      <h2>Add new Contact</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons 
        searchResults={searchResults}
        persons={persons} />
    </div>
  )
}

export default App
