import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  render() {
    return (
      <div className="loginContainer">
        <img
          className="loginImage"
          alt="Login"
          src="https://res.cloudinary.com/dqqijdyjr/image/upload/v1694414691/Login_Image_1x_vxhnbl.png"
        />
        <div className="rightContainer">
          <div className="logoContainer">
            <img
              className="logo"
              alt="logo"
              src="https://res.cloudinary.com/dqqijdyjr/image/upload/v1694414716/logo_bsgbfe.png"
            />
            <h1 className="heading">Insta Share</h1>
          </div>
          <form className="formContainer">
            <div className="formElement">
              <label className="labelEle" htmlFor="username">
                USERNAME
              </label>
              <input className="inputEle" id="username" type="text" />
            </div>
            <div className="formElement">
              <label className="labelEle" htmlFor="password">
                PASSWORD
              </label>
              <input className="inputEle" id="password" type="password" />
            </div>
            <button className="button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
