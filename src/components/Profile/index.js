import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileDetails: {},
    selectedSalaryRange: '10 LPA and above',
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {profileDetails} = this.state

    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-pix-cont">
        <img src={profileImageUrl} alt="cross" />
        <p className="name">{name}</p>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  retry = () => {
    this.getProfileDetails()
  }

  renderFailureView = () => (
    <div className="failure-cont">
      <button type="button" onClick={this.retry} className="button-retry">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-cont">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  handleSalaryRangeChange = val => {
    this.setState({
      selectedSalaryRange: val,
    })
  }

  renderProfileView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {
      employmentTypesList,
      salaryRangesList,
      selectedSalaryRange,
    } = this.props
    return (
      <div>
        <div>
          {this.renderProfileView()}
          <p className="line">{}</p>
        </div>
        <div>
          <h1> Type of Employement</h1>
          <ul className="typo-list">
            {employmentTypesList.map(each => (
              <li className="type-list">
                <input type="checkbox" />
                <p>{each.employmentTypeId}</p>
              </li>
            ))}
          </ul>
          <p className="line">{}</p>
        </div>
        <div>
          <h1>Salary Range</h1>
          <ul className="typo-list">
            {salaryRangesList.map(each => (
              <li className="salary-list">
                <input
                  type="radio"
                  name="salaryRange"
                  checked={selectedSalaryRange === each.label}
                  onChange={() => this.handleSalaryRangeChange(each.label)}
                />
                <p>{each.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Profile