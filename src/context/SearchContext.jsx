import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  onClickSearch: () => {},
  isSearchButtonClicked: false,
  isSearchOpenInMobile: false,
  OnOpenSearchInMobile: () => {},
})

export default SearchContext
