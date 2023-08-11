import './index.css'

const Skills = props => {
  const {eachList} = props
  const {name, imageUrl} = eachList

  return (
    <li className="skill-list-container-items">
      <img src={imageUrl} alt={name} className="skill-icon" />
      <p className="skill-para">{name}</p>
    </li>
  )
}
export default Skills