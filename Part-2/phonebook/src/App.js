import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
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
      number: newNumber,
      id: persons.length + 1
    }
    const dobbledName = persons.find(person => person.name === newName)

    dobbledName
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(personObject))

    personService
      .createOne(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }


  const deletePerson = (id, name) => {
    const confirmed = window.confirm(`Do you want to delete ${name}?`)
    if(confirmed) {
      personService
        .deleteOne(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
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
      <PersonList
        searchResults={searchResults}
        persons={persons}
        deletePerson={deletePerson} />
    </div>
  )
}

export default App
