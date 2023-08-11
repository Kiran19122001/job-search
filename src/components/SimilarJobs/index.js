import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'

import './index.css'

const SimilarJobs = props => {
  const {jobDetails} = props
  const {
    title,
    rating,
    location,
    jobDescription,
    employLogoUrl,
    employmentType,
  } = jobDetails
  console.log(jobDetails)

  return (
    <li className="list-container-data">
      <div className="card-container">
        <img
          src={employLogoUrl}
          alt="job details company logo"
          className="logo-image"
        />
        <div className="title-container">
          <h1 className="title-name">{title}</h1>
          <div className="star-container">
            <BsStarFill className="star-image" />
            <p className="para-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description">Description</h1>
      <p className="para-text">{jobDescription}</p>
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
    </li>
  )
}
export default SimilarJobs