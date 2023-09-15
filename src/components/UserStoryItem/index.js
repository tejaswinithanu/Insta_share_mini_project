import './index.css'

const UserStoryItem = props => {
  const {storyDetails} = props
  const {userName, storyUrl} = storyDetails
  return (
    <div className="storyContainer">
      <img className="storyImg" alt="user story" src={storyUrl} />
      <p className="userName">{userName}</p>
    </div>
  )
}

export default UserStoryItem
