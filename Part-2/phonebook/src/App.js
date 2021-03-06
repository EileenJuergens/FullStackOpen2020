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
      number: newNumber
    }

    const doubledPerson = persons.find(person => (
      person.name.toLowerCase() === newName.toLowerCase() && person.number === newNumber
    ))

    const doubledPersonNumber = persons.find(person => (
      person.name.toLowerCase() === newName.toLowerCase() && person.number !== newNumber
    ))

    // case if person exists already 
    if (doubledPerson) {
      alert(`${doubledPerson.name} is already added to phonebook`)
    }

    // case if number from person should be updated
    else if (doubledPersonNumber) {
      const message = `${doubledPersonNumber.name} is already in the phonebook, do you want to replace the old number with the new one?`
      const confirmed = window.confirm(message);

      if (confirmed) {
        const changedPerson = { ...doubledPersonNumber, number: newNumber }
        personService
          .updateOne(doubledPersonNumber.id, changedPerson)
          .then((data) => {
            setPersons(persons.map(person => person.id === data.id ? data : person))
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            if (error) {
              setError(true)
              setInfoMessage(`${error.response.data.error}`)
              setTimeout(() => {
                setInfoMessage(null)
                setError(false)
              }, 5000)
              setNewName('')
              setNewNumber('')
            } else {
              setError(true)
              setInfoMessage(`${personObject.name} was already deleted from server`)
              setPersons(persons.filter(person => person.id !== doubledPersonNumber.id))
              setTimeout(() => {
                setInfoMessage(null)
                setError(false)
              }, 5000)
            }
          })
      } else {
        setNewName('')
        setNewNumber('')
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
          }, 5000)
        })
        .catch(error => {
          setError(true)
          setInfoMessage(`${error.response.data.error}`)
          setTimeout(() => {
            setInfoMessage(null)
            setError(false)
          }, 5000)
          setNewName('')
          setNewNumber('')
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
