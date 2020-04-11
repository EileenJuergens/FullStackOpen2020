import React, { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])


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
        filter shown with: <input value={searchTerm} onChange={handleFilterChange} />
      <h2>Add new Contact</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} /><br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {searchResults.length
          ? searchResults.map(person => <li key={person.name}>{person.name} {person.number}</li>)
          : persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App
