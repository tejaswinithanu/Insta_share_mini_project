import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  onClickSearchIcon: () => {},
  isSearchButtonClicked: false,
  isSearchOpenInMobile: false,
  OnOpenSearchInMobile: () => {},
  onCloseSearchInMobile: () => {},
})

export default SearchContext
