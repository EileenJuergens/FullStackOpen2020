import React from 'react'

const Filter = ({ searchTerm, handleFilterChange }) => {
  return (
    <>
      filter shown with: <input value={searchTerm} onChange={handleFilterChange} />
    </>
  )
}

export default Filter;
