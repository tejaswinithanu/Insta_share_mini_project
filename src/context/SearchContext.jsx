import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  onClickSearch: () => {},
  isSearchButtonClicked: false,
})

export default SearchContext
