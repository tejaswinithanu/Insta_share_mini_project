import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import SearchContext from './context/SearchContext'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {
    searchInput: '',
    isSearchButtonClicked: false,
    isSearchOpenInMobile: false,
  }

  onClickSearch = value => {
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
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
