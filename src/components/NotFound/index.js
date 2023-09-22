import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="notFoundContainer">
    <img
      className="notFoundImg"
      alt="page not found"
      src="https://res.cloudinary.com/dqqijdyjr/image/upload/v1694414754/Page_Not_Found_gjaqwx.png"
    />
    <h1 className="notFoundHeading">Page Not Found</h1>
    <p className="notFoundHeading notFoundText">
      we are sorry, the page you requested could not be found.
      <br />
      Please go back to the home page.
    </p>
    <Link to="/">
      <button className="notFoundButton" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
