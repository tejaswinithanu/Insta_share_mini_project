import './index.css'

const UserStoryItem = props => {
  const {storyDetails} = props
  const {userName, storyUrl} = storyDetails
  return (
    <li className="storyContainer">
      <img className="storyImg" alt="user story" src={storyUrl} />
      <p className="userName">{userName}</p>
    </li>
  )
}

export default UserStoryItem
