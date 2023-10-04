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
        userId: profile.userId,
        userName: profile.userName,
        profilePic: profile.profilePic,
        followersCount: profile.followers_count,
        followingCount: profile.following_count,
        userBio: profile.user_bio,
        posts: profile.posts,
        stories: profile.stories,
        postsCount: profile.postsCount,
      }
      console.log(updatedProfile)
      this.setState({
        myProfileDetails: updatedProfile,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container profileLoader" /* testid="loader" */>
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
      <ul className="horizontalList">
        {stories.map(eachStory => (
          <li className="profileStoryListItem" key={eachStory.id}>
            <img
              className="profileStoryImage"
              alt="story"
              src={eachStory.image}
            />
          </li>
        ))}
      </ul>
    )
  }

  renderPosts = () => {
    const {myProfileDetails} = this.state
    const {posts, postsCount} = myProfileDetails

    return (
      <div>
        <div>
          <hr className="horizontalLine" />
        </div>
        <div className="horizontalList">
          <BsGrid3X3 />
          <p className="postsText">Posts</p>
        </div>
        {postsCount === 0 ? (
          <div className="noPostsContainer">
            <AiFillCamera className="camIcon" />
            <p className="noPostsText">No Posts Yet</p>
          </div>
        ) : (
          <ul className="horizontalList myProfilePostsList">
            {posts.map(eachPost => (
              <li className="profilePostListItem" key={eachPost.id}>
                <img className="postImage" alt="post" src={eachPost.image} />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderSuccessView = () => (
    <>
      <ProfileDetails />
      {this.renderStories()}
      {this.renderPosts()}
    </>
  )

  render() {
    const {apiStatus} = this.state
    return (
      <>
        <Header />
        <div className="myProfileContainer">
          {apiStatus === apiStatusConstants.success
            ? this.renderPosts()
            : this.renderLoadingView()}
        </div>
      </>
    )
  }
}

export default MyProfile
