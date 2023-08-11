import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {
  BsBoxArrowInUpRight,
  BsStarFill,
  BsFillBriefcaseFill,
} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'

import Header from '../Header'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsObject: [],
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
    skillList: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      this.setState({apiStatus: apiStatusConstants.success})
      const data = await response.json()
      console.log(data)
      const jobData = {
        id: data.job_details.id,
        companyLogoUrl: data.job_details.company_logo_url,
        employmentType: data.job_details.employment_type,
        companyWebsiteUrl: data.job_details.company_website_url,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        rating: data.job_details.rating,
        title: data.job_details.title,
        packagePerAnnum: data.job_details.package_per_annum,

        lifeAtCompanyDescription: data.job_details.life_at_company.description,
        lifeAtCompanyImageUrl: data.job_details.life_at_company.image_url,
      }
      const skills = data.job_details.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))

      this.setState({skillList: skills})

      const similarJobData = data.similar_jobs.map(eachJob => ({
        id: eachJob.id,
        employLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        similarJobsData: similarJobData,
        jobDetailsObject: jobData,
      })
    }
    if (response.status === 404) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetailsOnScreen = () => {
    const {similarJobsData, jobDetailsObject, skillList} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
      packagePerAnnum,
      lifeAtCompanyDescription,
      lifeAtCompanyImageUrl,
      companyWebsiteUrl,
    } = jobDetailsObject

    return (
      <div className="main-job-details-container">
        <div className="jobs-view-container">
          <div className="logo-container">
            <img
              src={companyLogoUrl}
              alt={companyLogoUrl}
              className="job-logo"
            />
            <div>
              <h1 className="job-title">{title}</h1>
              <div className="star-container">
                <BsStarFill className="star-image" />
                <p className="para-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="icon-location-container">
            <div className="flex-container">
              <div className="icon-container">
                <IoLocationSharp className="icon-image" />
                <p className="job-location-para">{location}</p>
              </div>

              <div className="briefcase-container">
                <BsFillBriefcaseFill className="icon-image" />
                <p className="job-location-para">{employmentType}</p>
              </div>
            </div>

            <p className="annual-income">{packagePerAnnum}</p>
          </div>

          <hr className="hr-line" />
          <div className="link-container">
            <h1 className="description">Description</h1>
            <a href={companyWebsiteUrl} className="link-text">
              {' '}
              Visit <BsBoxArrowInUpRight />
            </a>
          </div>

          <p className="description-matter">{jobDescription}</p>
          <h1 className="heading-jobs">Skills</h1>
          <div>
            <ul className="skills-list-main-container">
              {skillList.map(eachList => (
                <Skills key={eachList.id} eachList={eachList} />
              ))}
            </ul>
          </div>
          <h1 className="description-para">life at company</h1>
          <div className="life-company-container">
            <p className="description-para">{lifeAtCompanyDescription}</p>
            <img
              className="description-image"
              src={lifeAtCompanyImageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="description-jobs">Similar Jobs</h1>
        <ul className="similar-list">
          {similarJobsData.map(eachSimilarJob => (
            <SimilarJobs jobDetails={eachSimilarJob} key={eachSimilarJob.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seems to find the page you looking for.</p>
      <button type="button" onClick={this.retryToGetData}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderResultOfJob = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsOnScreen()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderResultOfJob()}
      </>
    )
  }
}

export default JobItemDetails