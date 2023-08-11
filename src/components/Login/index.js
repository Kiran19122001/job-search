import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    error: '',
  }

  onUserName = e => {
    this.setState({username: e.target.value})
  }

  onPassword = e => {
    this.setState({password: e.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 20})
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({showError: true, error})
    console.log(error)
  }

  onSubmitForm = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userData = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
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
    const {showError, error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-image"
          />
          <label htmlFor="user-name" className="label-name">
            USERNAME
          </label>
          <input
            type="text"
            id="user-name"
            placeholder="Username"
            className="input-field"
            onChange={this.onUserName}
          />
          <label htmlFor="password" className="label-name1">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="input-field"
            onChange={this.onPassword}
          />
          <button type="submit" className="button">
            Login
          </button>
          {showError && <p className="paragraph">* {error}</p>}
        </form>
      </div>
    )
  }
}

export default Login