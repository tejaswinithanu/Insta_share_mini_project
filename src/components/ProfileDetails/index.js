import './index.css'

const ProfileDetails = props => {
  const {profileDetails} = props
  const {
    userId,
    userName,
    profilePic,
    followersCount,
    followingCount,
    userBio,
    postsCount,
  } = profileDetails
  console.log(userName)
  return (
    <div className="profileContainer">
      <h1 className="mobile-name-heading nameHeading">{userName}</h1>
      <div className="profile-count-container">
        <img className="profileImage" alt="profile" src={profilePic} />
        <div>
          <h1 className="nameHeading">{userName}</h1>
          <div className="countContainer">
            <div className="countContainer">
              <p className="count">{postsCount}</p>
              <p className="detailsText">posts</p>
            </div>
            <div className="countContainer">
              <p className="count">{followersCount}</p>
              <p className="detailsText">followers</p>
            </div>
            <div className="countContainer">
              <p className="count">{followingCount}</p>
              <p className="detailsText">following</p>
            </div>
          </div>
          <div>
            <p className="detailsText userId">{userId}</p>
            <p className="detailsText user-bio">{userBio}</p>
          </div>
        </div>
      </div>
      <div className="mobile-view-details">
        <p>{userId}</p>
        <p className="detailsText">{userBio}</p>
      </div>
    </div>
  )
}

export default ProfileDetails
