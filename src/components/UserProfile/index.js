import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {AiFillCamera} from 'react-icons/ai'

import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {userProfileDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getUserProfileDetails()
  }

  getUserProfileDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const userDetails = data.user_details
      const updatedData = {
        id: userDetails.id,
        userId: userDetails.user_id,
        userName: userDetails.user_name,
        profilePic: userDetails.profile_pic,
        followersCount: userDetails.followers_count,
        followingCount: userDetails.following_count,
        userBio: userDetails.user_bio,
        posts: userDetails.posts,
        stories: userDetails.stories,
        postsCount: userDetails.posts_count,
      }
      // console.log(updatedData)
      this.setState({
        userProfileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container user-profile-loader" testid="loader">
      <Loader type="ThreeDots" color="#4094EF" height={30} width={30} />
    </div>
  )

  renderFailureView = () => (
    <div className="user-profile-failure">
      <img
        className="user-profile-failure-img"
        alt="failure view"
        src="https://res.cloudinary.com/dqqijdyjr/image/upload/v1694414580/API_failure_sndoer.png"
      />
      <p className="user-profile-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        onClick={this.getMyProfileDetails}
        className="user-profile-retry-button"
        type="button"
      >
        Try again
      </button>
    </div>
  )

  renderStories = () => {
    const {userProfileDetails} = this.state
    console.log(userProfileDetails)
    const {stories} = userProfileDetails
    return (
      <ul className="user-stories-list">
        {stories.map(eachStory => (
          <li className="user-profile-storyListItem" key={eachStory.id}>
            <img
              className="user-profile-storyImage"
              alt="user story"
              src={eachStory.image}
            />
          </li>
        ))}
      </ul>
    )
  }

  renderPosts = () => {
    const {userProfileDetails} = this.state
    const {posts, postsCount} = userProfileDetails

    return (
      <div>
        <div>
          <hr className="user-profile-horizontal-line" />
        </div>
        <div className="user-horizontal-list user-posts-text-icon">
          <BsGrid3X3 className="grid-icon" />
          <p className="user-posts-text">Posts</p>
        </div>
        {postsCount === 0 ? (
          <div className="user-noPostsContainer">
            <AiFillCamera className="user-camIcon" />
            <p className="user-noPostsText">No Posts Yet</p>
          </div>
        ) : (
          <ul className="userProfilePostsList">
            {posts.map(eachPost => (
              <li className="userProfilePostListItem" key={eachPost.id}>
                <img
                  className="userPostImage"
                  alt="user post"
                  src={eachPost.image}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderSuccessView = () => {
    const {userProfileDetails} = this.state
    return (
      <>
        <ProfileDetails
          altValue="user profile"
          profileDetails={userProfileDetails}
        />
        {this.renderStories()}
        {this.renderPosts()}
      </>
    )
  }

  renderUserProfilePage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
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
        <div className="userProfileContainer">
          {this.renderUserProfilePage()}
        </div>
      </>
    )
  }
}

export default UserProfile
