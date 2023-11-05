import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import {IoIosMenu} from 'react-icons/io'
import {MdCancel} from 'react-icons/md'

import SearchContext from '../../context/SearchContext'
import './index.css'

const Header = props => {
  const [isMenuOpen, openMenu] = useState(false)
  const [userInput, saveUserInput] = useState('')
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const onOpenMenu = () => {
    openMenu(true)
  }
  const onCloseMenu = () => {
    openMenu(false)
  }

  const onChangeSearchInput = event => {
    saveUserInput(event.target.value)
  }

  return (
    <SearchContext.Consumer>
      {value => {
        const {
          onClickSearch,
          OnOpenSearchInMobile,
          isSearchOpenInMobile,
        } = value
        const onClickSearchButton = () => {
          onClickSearch(userInput)
        }
        const onSearchOpen = () => {
          openMenu(false)
          OnOpenSearchInMobile()
        }

        return (
          <nav className="navbar">
            <div className="logoBar">
              <div className="itemsContainer">
                <Link to="/">
                  <img
                    className="siteLogo"
                    alt="website logo"
                    src="https://res.cloudinary.com/dqqijdyjr/image/upload/v1694414716/logo_bsgbfe.png"
                  />
                </Link>
                <h1 className="websiteName">Insta Share</h1>
              </div>
              <button onClick={onOpenMenu} type="button" className="menuIcon">
                <IoIosMenu onClick={onOpenMenu} />
              </button>
            </div>

            <div className="itemsContainer menuItems">
              <div className="itemsContainer searchBox">
                <input
                  className="searchBar"
                  placeholder="Search Caption"
                  type="search"
                  onChange={onChangeSearchInput}
                />
                <button
                  testid="searchIcon"
                  type="button"
                  className="searchIcon"
                  onClick={onClickSearchButton}
                >
                  <FaSearch className="search" />
                </button>
              </div>
              <Link className="linkItem" to="/">
                <p className="navItem">Home</p>
              </Link>
              <p className="navItem searchButton">Search</p>
              <Link className="linkItem" to="/my-profile">
                <p className="navItem">Profile</p>
              </Link>
              <button
                onClick={onClickLogout}
                className="logoutButton"
                type="button"
              >
                Logout
              </button>
              <button
                className="cancelButton"
                onClick={onCloseMenu}
                type="button"
              >
                <MdCancel />
              </button>
            </div>

            {isMenuOpen && (
              <div className="itemsContainer mobileViewContainer">
                <Link className="linkItem" to="/">
                  <p className="navItem">Home</p>
                </Link>
                <p onClick={onSearchOpen} className="navItem searchButton">
                  Search
                </p>
                <Link className="linkItem" to="/my-profile">
                  <p className="navItem">Profile</p>
                </Link>
                <button
                  onClick={onClickLogout}
                  className="logoutButton"
                  type="button"
                >
                  Logout
                </button>
                <button
                  className="cancelButton"
                  onClick={onCloseMenu}
                  type="button"
                >
                  <MdCancel />
                </button>
              </div>
            )}

            {isSearchOpenInMobile && (
              <div className="itemsContainer searchBox mobileViewContainer">
                <input
                  className="searchBar"
                  placeholder="Search Caption"
                  type="search"
                  onChange={onChangeSearchInput}
                />
                <button
                  testid="searchIcon"
                  type="button"
                  className="searchIcon"
                  onClick={onClickSearchButton}
                >
                  <FaSearch className="search" />
                </button>
              </div>
            )}
          </nav>
        )
      }}
    </SearchContext.Consumer>
  )
  /* return (
    <>
      <nav className="navbar">
        <div className="itemsContainer">
          <Link to="/">
            <img
              className="siteLogo"
              alt="website logo"
              src="https://res.cloudinary.com/dqqijdyjr/image/upload/v1694414716/logo_bsgbfe.png"
            />
          </Link>
          <h1 className="websiteName">Insta Share</h1>
        </div>
        <button type="button" className="menuIcon">
          <IoIosMenu onClick={onOpenMenu} />
        </button>
        <div className="itemsContainer menuItems">
          <div className="itemsContainer searchBox">
            <input
              className="searchBar"
              placeholder="Search Caption"
              type="search"
            />
            <button
              // testid="searchIcon"
              type="button"
              className="searchIcon"
            >
              <FaSearch className="search" />
            </button>
          </div>
          <Link className="linkItem" to="/">
            <p className="navItem">Home</p>
          </Link>
          <Link className="linkItem" to="/my-profile">
            <p className="navItem">Profile</p>
          </Link>
          <button
            onClick={onClickLogout}
            className="logoutButton"
            type="button"
          >
            Logout
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="itemsContainer">
          <Link className="linkItem" to="/">
            <p className="navItem">Home</p>
          </Link>
          <Link className="linkItem" to="/">
            <p onClick={onSearchOpen} className="navItem">
              Search
            </p>
          </Link>
          <Link className="linkItem" to="/my-profile">
            <p className="navItem">Profile</p>
          </Link>
          <button
            onClick={onClickLogout}
            className="logoutButton"
            type="button"
          >
            Logout
          </button>
          <button className="cancelButton" onClick={onCloseMenu} type="button">
            <MdCancel />
          </button>
        </div>
      )}
      {isSearchOpened && (
        <div className="searchSection">
          <div className="itemsContainer searchBox">
            <input
              className="searchBar"
              placeholder="Search Caption"
              type="search"
            />
            <button
              // testid="searchIcon"
              type="button"
              className="searchIcon"
            >
              <FaSearch className="search" />
            </button>
          </div>
        </div>
      )}
    </>
  ) */
}

export default withRouter(Header)
