import React from 'react'

const PersonList = ({ searchResults, persons, deletePerson }) => {
  return (
    <ul>
      {searchResults.length
        ? searchResults.map(person => <li key={person.name}>{person.name} {person.number}</li>)
        : persons.map(person => 
          <li key={person.name}>
            {person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
          </li>
        )
      }
    </ul>
  )
}

export default PersonList;
