import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = () => {
  const logoutButton = props => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <Link to="/" style={{textDecoration: 'none'}}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="image"
        />
      </Link>
      <ul className="home-container">
        <Link to="/" style={{textDecoration: 'none'}}>
          <li className="list-items">Home</li>
        </Link>
        <Link to="/jobs" style={{textDecoration: 'none'}}>
          <li className="list-items">Jobs</li>
        </Link>
      </ul>
      <Link to="/login">
        <li className="list-items">
          <button
            type="button"
            className="logout-Button"
            onClick={logoutButton}
          >
            Logout
          </button>
        </li>
      </Link>
    </div>
  )
}

export default withRouter(Header)