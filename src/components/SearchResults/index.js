import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import UserPostItem from '../UserPostItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchedPosts: [],
      searchInputValue: props.searchInput,
      postsCount: 0,
      apiStatus: apiStatusConstants.initial,
    }
  }

  componentDidMount() {
    this.getSearchedPosts()
  }

  getSearchedPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInputValue} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchInputValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {posts, total} = data
      const updatedData = posts.map(post => ({
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
      this.setState({
        searchedPosts: updatedData,
        postsCount: total,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container search-loader" testid="loader">
      <Loader type="ThreeDots" color="#4094EF" height={30} width={30} />
    </div>
  )

  renderFailureView = () => (
    <div className="search-failure-container">
      <img
        className="search-failure-img"
        alt="failure view"
        src="https://res.cloudinary.com/dqqijdyjr/image/upload/v1694414580/API_failure_sndoer.png"
      />
      <p className="search-failure-text">
        Something went wrong. Please try again
      </p>
      <button
        onClick={this.getSearchedPosts}
        className="search-retry-button"
        type="button"
      >
        Try again
      </button>
    </div>
  )

  renderSearchedPosts = () => {
    const {searchedPosts} = this.state
    return (
      <>
        <h1 className="search-heading">Search Results</h1>
        <div className="searched-posts-container">
          <ul className="searched-posts-list">
            {searchedPosts.map(eachPost => (
              <UserPostItem key={eachPost.postId} userPostDetails={eachPost} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderSearchNotFound = () => (
    <div className="search-not-found-container">
      <img
        className="search-not-found-img"
        alt="search not found"
        src="https://res.cloudinary.com/dqqijdyjr/image/upload/v1694414768/Search_Not_Found_1x_kbr6v6.png"
      />
      <h1 className="search-not-found-text">Search Not Found</h1>
      <p className="search-not-found-text not-found-text">
        Try different keyword or search again
      </p>
    </div>
  )

  renderSuccessView = () => {
    const {postsCount} = this.state
    return (
      <>
        {postsCount === 0
          ? this.renderSearchNotFound()
          : this.renderSearchedPosts()}
      </>
    )
  }

  renderSearchResultsPage = () => {
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
        <div className="search-results-container">
          {this.renderSearchResultsPage()}
        </div>
      </>
    )
  }
}

export default SearchResults
