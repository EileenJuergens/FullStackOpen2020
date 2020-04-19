import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [infoMessage, setInfoMessage] = useState(null)
  const [error, setError] = useState(false);


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
      id: newName
    }

    const dobbledPerson = persons.find(person => (
      person.name.toLowerCase() === newName.toLowerCase() && person.number === newNumber
    ))

    const dobbledPersonNumber = persons.find(person => (
      person.name.toLowerCase() === newName.toLowerCase() && person.number !== newNumber
    ))

    // case if person exsist already 
    if (dobbledPerson) {
      alert(`${dobbledPerson.name} is already added to phonebook`)
    }

    // case if number from person should be updated
    else if (dobbledPersonNumber) {
      const message = `${dobbledPersonNumber.name} is already in the phonebook, do you want to replace the old number with the new one?`
      const confirmed = window.confirm(message);

      if (confirmed) {
        personService
          .updateOne(dobbledPersonNumber.id, {
            name: dobbledPersonNumber.name,
            number: newNumber
          })
          .then((data) => {
            setPersons(persons.map(person => person.id === data.id ? data : person))
            setNewName('');
            setNewNumber('');
          })
          .catch(() => {
            setError(true)
            setInfoMessage(`${personObject.name} was already deleted from server`)
            setPersons(persons.filter(person => person.id !== dobbledPersonNumber.id))
            setTimeout(() => {
              setInfoMessage(null)
              setError(false)
            }, 3000)
          })
      }
    }

    // normal create new person case
    else {
      personService
        .createOne(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setInfoMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setInfoMessage(null)
          }, 3000)
        })
    }
  }


  const deletePerson = (id, name) => {
    const message = `Do you want to delete ${name}?`
    const confirmed = window.confirm(message)
    if (confirmed) {
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
      <h1>Phonebook</h1>
      <Notification message={infoMessage} error={error} />
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
