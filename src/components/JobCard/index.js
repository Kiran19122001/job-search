import {Link} from 'react-router-dom'
import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import './index.css'

const JobCard = props => {
  const {jobsData} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagee,
    rating,
  } = jobsData
  return (
    <Link to={`/jobs/${id}`} style={{textDecoration: 'none'}}>
      <li className="jobs-view-container">
        <div className="logo-container">
          <img src={companyLogoUrl} alt="company logo" className="job-logo" />
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

          <h1 className="annual-income">{packagee}</h1>
        </div>

        <hr className="hr-line" />
        <h1 className="description">Description</h1>
        <p className="description-matter">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobCard