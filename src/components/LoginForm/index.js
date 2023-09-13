import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isErrorShown: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isErrorShown: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isErrorShown, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
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
          <form onSubmit={this.onSubmitForm} className="formContainer">
            <div className="formElement">
              <label className="labelEle" htmlFor="username">
                USERNAME
              </label>
              <input
                value={username}
                onChange={this.onChangeUsername}
                className="inputEle"
                id="username"
                type="text"
              />
            </div>
            <div className="formElement">
              <label className="labelEle" htmlFor="password">
                PASSWORD
              </label>
              <input
                value={password}
                onChange={this.onChangePassword}
                className="inputEle"
                id="password"
                type="password"
              />
            </div>
            {isErrorShown && <p className="errorMsg">*{errorMsg}</p>}
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
