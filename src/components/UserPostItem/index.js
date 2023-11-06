import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'

import './index.css'

class UserPostItem extends Component {
  constructor(props) {
    super(props)
    const {userPostDetails} = props
    const {likesCount} = userPostDetails
    this.state = {isLiked: false, noOfLikes: likesCount}
  }

  onClickLikeIcon = () => {
    this.setState(
      prevState => ({
        isLiked: !prevState.isLiked,
      }),
      this.updatePostStatus,
    )
  }

  updatePostStatus = async () => {
    const {isLiked} = this.state
    if (isLiked) {
      this.setState(prevState => ({noOfLikes: prevState.noOfLikes + 1}))
    } else {
      this.setState(prevState => ({noOfLikes: prevState.noOfLikes - 1}))
    }
    const {userPostDetails} = this.props
    const {postId} = userPostDetails
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const token = Cookies.get('jwt_token')
    const likeStatus = {like_status: isLiked}
    const options = {
      method: 'POST',
      body: JSON.stringify(likeStatus),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
  }

  render() {
    const {userPostDetails} = this.props
    const {
      userName,
      profilePic,
      postDetails,
      comments,
      userId,
      createdAt,
    } = userPostDetails
    const {imageUrl, caption} = postDetails
    const {isLiked, noOfLikes} = this.state
    const testIdValue = isLiked ? 'unLikeIcon' : 'likeIcon'
    return (
      <li className="listItem">
        <div className="miniContainer">
          <img
            className="profilePic"
            alt="post author profile"
            src={profilePic}
          />
          <Link className="linkName" to={`/users/${userId}`}>
            <p className="profileName">{userName}</p>
          </Link>
        </div>
        <img className="post" alt="post" src={imageUrl} />
        <div className="postDetailsContainer">
          <div className="miniContainer miniContainerPadding">
            <button
              testid={testIdValue}
              className="postIcon"
              onClick={this.onClickLikeIcon}
              type="button"
            >
              {isLiked ? <FcLike /> : <BsHeart />}
            </button>
            <button className="postIcon" type="button">
              <FaRegComment />
            </button>
            <button className="postIcon" type="button">
              <BiShareAlt />
            </button>
          </div>
          <p className="postText likes">{noOfLikes} likes</p>
          <p className="postText caption">{caption}</p>
          <ul className="commentsUl">
            {comments.map(eachComment => (
              <li className="commentListItem" key={eachComment.commentedUserId}>
                <p className="comment commented-user-name">
                  {eachComment.commentedUsername}
                </p>
                <p className="comment"> {eachComment.comment}</p>
              </li>
            ))}
          </ul>
          <p className="postText createdTime">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default UserPostItem
