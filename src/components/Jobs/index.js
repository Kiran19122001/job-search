import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import JobCard from '../JobCard'
import FilterSearch from '../FilterSearch'
import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileData: [],
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    activeJobId: [],
    searchInput: '',
    activeSalaryId: '',
    profileApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
    this.renderProfile()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
      activeJobId: [],
      activeSalaryId: '',
    })

    const jwtToken = Cookies.get('jwt_token')
    const {activeJobId, searchInput, activeSalaryId} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${activeJobId}&minimum_package=${activeSalaryId}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        id: eachJob.id,
        title: eachJob.title,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagee: eachJob.package_per_annum,
        rating: eachJob.rating,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
      console.log(data)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeJobCategory = activeJobId => {
    this.setState({activeJobId}, this.getJobs)
  }

  changeSalary = activeSalaryId => {
    this.setState({activeSalaryId}, this.getJobs)
  }

  enterSearchInput = () => {
    this.getJobs()
  }

  changeEmploymentType = type => {
    this.setState(
      prev => ({activeJobId: [...prev.activeJobId, type]}),
      this.getJobs,
    )
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.getJobs} className="retry-button">
        Retry
      </button>
    </div>
  )

  renderProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileUrl: data.profile_details.profile_image_url,
        bio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsListView = () => {
    const {jobsList} = this.state
    const showJobsList = jobsList.length > 0

    return showJobsList ? (
      <div>
        <ul className="unOrder-list-container">
          {jobsList.map(eachJobs => (
            <JobCard jobsData={eachJobs} key={eachJobs.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div>
        <div className="no-products-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
            className="no-products-img"
            alt="no jobs"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-description">
            We could not find any jobs. Try other filters.
          </p>
          <button className="retry-button" type="button" onClick={this.getJobs}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProfileFailureView = () => (
    <div className="profile-container">
      <button
        type="button"
        onClick={this.renderProfile}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderAllJobsResult = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderProfileSuccessView = () => {
    const {profileData} = this.state
    const {name, profileUrl, bio} = profileData
    return (
      <div className="profile-container">
        <img src={profileUrl} alt="profile" className="profile-image" />
        <h1 className="name">{name}</h1>
        <p className="bio">{bio}</p>
      </div>
    )
  }

  renderProfileList = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeJobId, activeSalaryId, searchInput} = this.state

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-filter-container">
            {this.renderProfileList()}
            <hr className="hr-line" />
            <FilterSearch
              searchInput={searchInput}
              enterSearchInput={this.enterSearchInput}
              changeSearchInput={this.changeSearchInput}
              employmentTypesList={employmentTypesList}
              activeJobId={activeJobId}
              changeEmploymentType={this.changeEmploymentType}
              changeJobCategory={this.changeJobCategory}
              salaryRangesList={salaryRangesList}
              activeSalaryId={activeSalaryId}
              changeSalary={this.changeSalary}
            />
          </div>

          {this.renderAllJobsResult()}
        </div>
      </>
    )
  }
}

export default Jobs