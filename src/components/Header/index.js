import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import {IoIosMenu} from 'react-icons/io'
import {MdCancel} from 'react-icons/md'

import './index.css'

const Header = props => {
  const {info} = props
  const [isMenuOpen, openMenu] = useState(false)
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
  return (
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
              data-testid="searchIcon"
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
            <p className="navItem">Search</p>
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
    </>
  )
}

export default withRouter(Header)
