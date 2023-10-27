import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {UserProfileDetails: {}, apiStatus: apiStatusConstants.initial}

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
      this.setState({
        UserProfileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container user-profile-loader" /* testid="loader" */>
      <Loader type="ThreeDots" color="#4094EF" height={30} width={30} />
    </div>
  )

  render() {
    return (
      <>
        <Header />
      </>
    )
  }
}

export default UserProfile
