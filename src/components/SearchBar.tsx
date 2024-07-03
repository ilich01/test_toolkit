import React from 'react'

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}
const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" />
    </div>
  )
}

export default SearchBar
