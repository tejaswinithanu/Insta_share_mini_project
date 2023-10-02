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
  return (
    <div className="profileContainer">
      <h1 className="nameHeading">{userName}</h1>
      <div>
        <img alt="profile" src={profilePic} />
        <div>
          <h1 className="nameHeading">{userName}</h1>
          <div className="countContainer">
            <div className="countContainer">
              <p>{postsCount}</p>
              <p className="detailsText">posts</p>
            </div>
            <div className="countContainer">
              <p>{followersCount}</p>
              <p className="detailsText">followers</p>
            </div>
            <div className="countContainer">
              <p>{followingCount}</p>
              <p className="detailsText">following</p>
            </div>
          </div>
          <p className="detailsText userId">{userId}</p>
          <p className="detailsText">{userBio}</p>
        </div>
      </div>
      <div>
        <p>{userId}</p>
        <p className="detailsText">{userBio}</p>
      </div>
    </div>
  )
}

export default ProfileDetails
