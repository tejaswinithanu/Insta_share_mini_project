import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MyProfile extends Component {
  state = {myProfileDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getMyProfileDetails()
  }

  getMyProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {profile} = data
      const updatedProfile = {
        id: profile.data,
        userId: profile.user_id,
        userName: profile.user_name,
        profilePic: profile.profile_pic,
        followersCount: profile.followers_count,
        followingCount: profile.following_count,
        userBio: profile.user_bio,
        posts: profile.posts,
        stories: profile.stories,
        postsCount: profile.posts_count,
      }
      // console.log(updatedProfile)
      this.setState({
        myProfileDetails: updatedProfile,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container profileLoader" testid="loader">
      <Loader type="ThreeDots" color="#4094EF" height={30} width={30} />
    </div>
  )

  renderFailureView = () => (
    <div className="failureContainer">
      <img
        className="failureImg"
        alt="failure view"
        src="https://res.cloudinary.com/dqqijdyjr/image/upload/v1694414580/API_failure_sndoer.png"
      />
      <p className="failureText">Something went wrong. Please try again</p>
      <button
        onClick={this.getMyProfileDetails}
        className="profileRetryButton"
        type="button"
      >
        Try again
      </button>
    </div>
  )

  renderStories = () => {
    const {myProfileDetails} = this.state
    const {stories} = myProfileDetails
    return (
      <ul className="storiesList">
        {stories.map(eachStory => (
          <li className="profileStoryListItem" key={eachStory.id}>
            <img
              className="profileStoryImage"
              alt="my story"
              src={eachStory.image}
            />
          </li>
        ))}
      </ul>
    )
  }

  renderPosts = () => {
    const {myProfileDetails} = this.state
    const {posts} = myProfileDetails

    return (
      <div>
        <div>
          <hr className="horizontalLine" />
        </div>
        <div className="horizontalList posts-text-icon">
          <BsGrid3X3 className="grid-icon" />
          <h1 className="postsText">Posts</h1>
        </div>
        {posts.length === 0 ? (
          <div className="noPostsContainer">
            <BiCamera className="camIcon" />
            <h1 className="noPostsText">No Posts</h1>
          </div>
        ) : (
          <ul className="myProfilePostsList">
            {posts.map(eachPost => (
              <li className="profilePostListItem" key={eachPost.id}>
                <img className="postImage" alt="my post" src={eachPost.image} />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderSuccessView = () => {
    const {myProfileDetails} = this.state
    return (
      <>
        <ProfileDetails
          altValue="my profile"
          profileDetails={myProfileDetails}
        />
        {this.renderStories()}
        {this.renderPosts()}
      </>
    )
  }

  renderMyProfilePage = () => {
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
        <div className="myProfileContainer">{this.renderMyProfilePage()}</div>
      </>
    )
  }
}

export default MyProfile
