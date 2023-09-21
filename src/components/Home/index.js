import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillExclamationTriangleFill} from 'react-icons/bs'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Header from '../Header'
import UserStoryItem from '../UserStoryItem'
import UserPostItem from '../UserPostItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    storiesApiStatus: apiStatusConstants.initial,
    postsApiStatus: apiStatusConstants.initial,
    storiesList: [],
    postsList: [],
  }

  componentDidMount() {
    this.getInstaStories()
    this.getInstaPosts()
  }

  getInstaStories = async () => {
    this.setState({storiesApiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const fetchedData = data.users_stories
      const updatedData = fetchedData.map(eachStory => ({
        userId: eachStory.user_id,
        userName: eachStory.user_name,
        storyUrl: eachStory.story_url,
      }))
      // console.log(updatedData)
      this.setState({
        storiesList: updatedData,
        storiesApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({storiesApiStatus: apiStatusConstants.failure})
    }
  }

  getInstaPosts = async () => {
    this.setState({postsApiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedData = data.posts
      const updatedData = fetchedData.map(post => ({
        postId: post.post_id,
        userId: post.user_id,
        userName: post.user_name,
        profilePic: post.profile_pic,
        postDetails: {
          imageUrl: post.post_details.image_url,
          caption: post.post_details.caption,
        },
        likesCount: post.likes_count,
        comments: post.comments.map(eachComment => ({
          commentedUsername: eachComment.user_name,
          commentedUserId: eachComment.user_id,
          comment: eachComment.comment,
        })),
        createdAt: post.created_at,
      }))
      // console.log(updatedData)
      this.setState({
        postsList: updatedData,
        postsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({postsApiStatus: apiStatusConstants.failure})
    }
  }

  renderStories = () => {
    const lgSettings = {
      slidesToShow: 7,
      slidesToScroll: 1,
      swipeToSlide: true,
      speed: 300,
    }
    const smSettings = {
      slidesToShow: 4,
      slidesToScroll: 1,
      swipeToSlide: true,
      speed: 300,
    }
    const {storiesList} = this.state
    return (
      <>
        <Slider className="largerSlider" {...lgSettings}>
          {storiesList.map(eachStory => (
            <UserStoryItem key={eachStory.userId} storyDetails={eachStory} />
          ))}
        </Slider>
        <Slider className="smallSlider" {...smSettings}>
          {storiesList.map(eachStory => (
            <UserStoryItem key={eachStory.userId} storyDetails={eachStory} />
          ))}
        </Slider>
      </>
    )
  }

  renderPosts = () => {
    const {postsList} = this.state
    return (
      <ul>
        {postsList.map(eachPost => (
          <UserPostItem userPostDetails={eachPost} key={eachPost.postId} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container loader" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={30} width={30} />
    </div>
  )

  renderFailureView = () => (
    <div className="alertContainer">
      <BsFillExclamationTriangleFill className="alert" />
      <p className="alertText">Something went wrong. Please try again</p>
      <button
        onClick={this.getInstaPosts}
        className="retryButton"
        type="button"
      >
        Try again
      </button>
    </div>
  )

  render() {
    const {storiesApiStatus, postsApiStatus} = this.state
    return (
      <>
        <Header />
        <div className="homeContainer">
          {storiesApiStatus === apiStatusConstants.inProgress
            ? this.renderLoadingView()
            : this.renderStories()}
          <div className="postsContainer">
            {postsApiStatus === apiStatusConstants.inProgress
              ? this.renderLoadingView()
              : this.renderPosts()}
          </div>
        </div>
      </>
    )
  }
}

export default Home
