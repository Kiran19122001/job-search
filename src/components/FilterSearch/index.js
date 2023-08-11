import {BsSearch} from 'react-icons/bs'
import './index.css'

const FilterSearch = props => {
  const renderJobsCategoryFilterList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(eachType => {
      const {changeEmploymentType} = props

      const onChangeCategory = event => changeEmploymentType(event.target.value)

      return (
        <form>
          <li
            className="rating-item"
            onClick={onChangeCategory}
            key={eachType.employmentTypeId}
          >
            <input
              className="checkBox"
              type="checkbox"
              id={eachType.employmentTypeId}
              value={eachType.employmentTypeId}
            />
            <label htmlFor={eachType.employmentTypeId} className="cursor">
              {eachType.label}
            </label>
          </li>
        </form>
      )
    })
  }

  const renderJobType = () => (
    <>
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="list-items">{renderJobsCategoryFilterList()}</ul>
    </>
  )

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {searchInput} = props
    return (
      <div className="search-container">
        <input
          value={searchInput}
          type="search"
          className="search"
          placeholder="Search"
          testid="searchButton"
          key="label"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          className="icon"
          testid="searchButton"
          onClick={onEnterSearchInput}
          type="button"
        >
          <BsSearch />
        </button>
      </div>
    )
  }

  const renderSalaryJobsList = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(eachSalary => {
      const {changeSalary} = props
      console.log(eachSalary.salaryRangeId)
      const onClickChangeCategory = () => changeSalary(eachSalary.salaryRangeId)

      return (
        <li
          className="rating-item"
          onChange={onClickChangeCategory}
          key={eachSalary.salaryRangeId}
        >
          <input
            type="radio"
            id={eachSalary.salaryRangeId}
            value={eachSalary.salaryRangeId}
            name="salary"
          />
          <label htmlFor={eachSalary.salaryRangeId} className="cursor">
            {eachSalary.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryResult = () => (
    <>
      <h1 className="employment-heading">Salary Range</h1>
      <ul className="list-items">{renderSalaryJobsList()}</ul>
    </>
  )

  return (
    <div>
      {renderSearchInput()}

      {renderJobType()}
      <hr className="horizontal-line" />
      {renderSalaryResult()}
      <hr className="horizontal-line" />
    </div>
  )
}

export default FilterSearch