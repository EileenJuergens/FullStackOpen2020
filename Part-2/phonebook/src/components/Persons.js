import React from 'react'

const Persons = ({ searchResults, persons }) => {
  return (
    <ul>
      {searchResults.length
        ? searchResults.map(person => <li key={person.name}>{person.name} {person.number}</li>)
        : persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  )
}

export default Persons;
