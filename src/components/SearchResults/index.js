import {Component} from 'react'
import Cookies from 'js-cookie'

import SearchContext from '../../context/SearchContext'

class SearchResults extends Component {
  state = {searchedPosts: []}

  componentDidMount() {
    this.getSearchedPosts()
  }

  getSearchedPosts = () => (
    <SearchContext.Consumer>
      {value => {
        const {searchInput} = value
        const token = Cookies.get('jwt_token')
        const url = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      }}
    </SearchContext.Consumer>
  )

  render() {
    return <div>HI</div>
  }
}

export default SearchResults
