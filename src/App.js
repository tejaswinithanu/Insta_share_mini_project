import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import SearchContext from './context/SearchContext'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import NotFound from './components/NotFound'
import SearchResults from './components/SearchResults'
import UserProfile from './components/UserProfile'

import './App.css'

class App extends Component {
  state = {
    searchInput: '',
    isSearchButtonClicked: false,
    isSearchOpenInMobile: false,
  }

  onClickSearchIcon = value => {
    this.setState({searchInput: value, isSearchButtonClicked: true})
    // console.log(value)
  }

  OnOpenSearchInMobile = () => {
    this.setState({isSearchOpenInMobile: true})
  }

  render() {
    const {
      searchInput,
      isSearchButtonClicked,
      isSearchOpenInMobile,
    } = this.state
    return (
      <SearchContext.Provider
        value={{
          searchInput,
          isSearchButtonClicked,
          isSearchOpenInMobile,
          onClickSearch: this.onClickSearch,
          OnOpenSearchInMobile: this.OnOpenSearchInMobile,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
